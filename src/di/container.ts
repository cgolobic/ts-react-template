import { ServiceRegistration } from './types/service-registration';
import { FunctionRegistration } from './types/function-registration';
var _providerInstantiationComplete = false;
var _providerMap: Map<string, any> = new Map();
var _registrationMap: Map<string, ServiceRegistration> = new Map();
var _instantiationStack: string[] = [];

// Internal functions

function _isDependencyRegistered(key: string): boolean {
  return _providerMap.has(key);
}

function _registerService(serviceRegistration: ServiceRegistration): void {
  if (!_isDependencyRegistered(serviceRegistration.service.name)) {
    _instantiationStack.push(serviceRegistration.service.name);
    if (serviceRegistration.overrideService !== undefined && serviceRegistration.overrideService !== null) {      
      _providerMap.set(serviceRegistration.service.name, new serviceRegistration.overrideService());
    } else {
      _providerMap.set(serviceRegistration.service.name, new serviceRegistration.service());
    }
    _instantiationStack.pop();
  }
}

function _registerFunction(functionRegistration: FunctionRegistration): void {
  if (functionRegistration.function.name === 'function') {
    throw Error('Registering anonymous functions is not permitted.');
  }
  if (!_isDependencyRegistered(functionRegistration.function.name)) {
    if (functionRegistration.overrideFunction !== undefined && functionRegistration.overrideFunction !== null) {
      _providerMap.set(functionRegistration.function.name, functionRegistration.overrideFunction);
    } else {
      _providerMap.set(functionRegistration.function.name, functionRegistration.function)
    }
  }
}


// Exports

export function registerDependencyProviders (dependencyProviders: (ServiceRegistration | FunctionRegistration)[]) {
  _providerMap = new Map();
  _providerInstantiationComplete = false;
  _instantiationStack = [];

  // Build a map of all registrations for reference when intantiating the dependency graph
  dependencyProviders
    .forEach((provider: ServiceRegistration | FunctionRegistration) => {
      if (provider.hasOwnProperty('service')) {
        let reg = provider as ServiceRegistration;
        _registrationMap.set(reg.service.name, reg);
      } else {
        _registerFunction(provider as FunctionRegistration);
      }
    });

  // Recursively instantiate and register all service providers in the dependency graph
  _registrationMap.forEach((serviceRegistration: ServiceRegistration) => _registerService(serviceRegistration));

  _providerInstantiationComplete = true;
}

 export function fetchDependency(key: string) {
  if (!_providerInstantiationComplete) {
    if (!_registrationMap.has(key)) {
      throw Error(`Dependency ${key} has not been registered with the dependency container.`);
    }
    if (!_isDependencyRegistered(key)) {
      let registration = _registrationMap.get(key);
      if (_instantiationStack.find((providerKey: string) => providerKey === key)) {
        throw Error('Circular dependency detected');
      }
      _registerService(registration);
    }
  } else {
    if (!_isDependencyRegistered(key)) {
      throw new Error(`Dependency ${key} has not been registered with the dependency container.`);
    }
  }
  return _providerMap.get(key);
}
  