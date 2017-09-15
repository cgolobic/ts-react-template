import { ServiceRegistration } from './types/service-registration';
import { FunctionRegistration } from './types/function-registration';
var _registeredDependencies = {} as any;
var _providerInstantiationComplete = false;
var _providerMap: Map<string, any> = new Map();
var _registrationMap: Map<string, ServiceRegistration> = new Map();
var _instantiationStack: string[] = [];

export function registerDependencyProviders (dependencyProviders: (ServiceRegistration | FunctionRegistration)[]) {
  _providerMap = new Map();
  _providerInstantiationComplete = false;
  _instantiationStack = [];
  dependencyProviders
    .forEach((provider: ServiceRegistration | FunctionRegistration) => {
      if (provider.hasOwnProperty('service')) {
        let reg = provider as ServiceRegistration;
        _registrationMap.set(reg.service.name, reg);
      } else {
        _registerFunction(provider as FunctionRegistration);
      }
    });
  _registrationMap.forEach((val: ServiceRegistration) => _registerService(val));
  _providerInstantiationComplete = true;
}

function _registerService(serviceRegistration: ServiceRegistration): void {
  if (!isDependencyRegistered(serviceRegistration.service)) {
    _instantiationStack.push(serviceRegistration.service.name);
    if (serviceRegistration.overrideService !== undefined && serviceRegistration.overrideService !== null) {      
      _registeredDependencies[(serviceRegistration.service as any).name] = new serviceRegistration.overrideService();
    } else {
      _registeredDependencies[(serviceRegistration.service as any).name] = new serviceRegistration.service();
    }
    _instantiationStack.pop();
  }
}

function _registerFunction(functionRegistration: FunctionRegistration): void {
  if (functionRegistration.function.name === 'function') {
    throw Error('Registering anonymous functions is not permitted.');
  }
  if (!isDependencyRegistered(functionRegistration.function)) {
    if (functionRegistration.overrideFunction !== undefined && functionRegistration.overrideFunction !== null) {
      _registeredDependencies[functionRegistration.function.name] = functionRegistration.overrideFunction;
    } else {
      _registeredDependencies[functionRegistration.function.name] = functionRegistration.function;
    }
  }
}

 export function fetchDependency(key: string) {
  let registeredDependency = _registeredDependencies[key];
  if (!_providerInstantiationComplete) {
    if (_registrationMap.get(key) === undefined) {
      throw Error(`Dependency ${key} has not been registered with the dependency container.`);
    }
    if (registeredDependency === undefined || registeredDependency === null) {
      let registration = _registrationMap.get(key);
      if (_instantiationStack.find((providerKey: string) => providerKey === key)) {
        throw Error('Circular dependency detected');
      }
      _registerService(registration);
    }
    return _registeredDependencies[key];
  } else {
    if (registeredDependency === undefined || registeredDependency === null) {
      throw new Error(`Dependency ${key} has not been registered with the dependency container.`);
    }
    return registeredDependency;
  }
}

function isDependencyRegistered(dependency: any): boolean {
  return _registeredDependencies.hasOwnProperty(dependency.name);
}
  