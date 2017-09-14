import { ServiceRegistration } from './types/service-registration';
import { FunctionRegistration } from './types/function-registration';
var _registeredDependencies = {} as any;
var _providerInstantiationComplete = false;
var _providerMap: Map<string, any> = new Map();
var _registrationMap: Map<string, {registration: ServiceRegistration, instantiating: boolean}> = new Map();

export function registerDependencyProviders (dependencyProviders: (ServiceRegistration | FunctionRegistration)[]) {
  _registeredDependencies = new Map();
  _providerInstantiationComplete = false;
  dependencyProviders
    .filter((provider: ServiceRegistration | FunctionRegistration) => provider.hasOwnProperty('service'))
    .forEach((provider: ServiceRegistration) => _registrationMap.set(
      provider.service.name,
      {
        registration: provider,
        instantiating: false
      }
    ));
  _registrationMap.forEach((val: any) => {
    val.instantiating = true;
    _registerService(val.registration);
    val.instantiating = false;
  });
  _providerInstantiationComplete = true;
}

function _registerService(serviceRegistration: ServiceRegistration): void {
  if (!isDependencyRegistered(serviceRegistration.service)) {
    if (serviceRegistration.overrideService !== undefined && serviceRegistration.overrideService !== null) {      
      _registeredDependencies[(serviceRegistration.service as any).name] = new serviceRegistration.overrideService();
    } else {
      _registeredDependencies[(serviceRegistration.service as any).name] = new serviceRegistration.service();
    }
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
  if (!_providerInstantiationComplete) {
    if (_registrationMap.get(key) === undefined) {
      throw Error(`Dependency ${key} has not been registered with the dependency container.`);
    }
    let registeredDependency = _registeredDependencies[key];
    if (registeredDependency === undefined || registeredDependency === null) {
      let registration = _registrationMap.get(key);
      if (registration.instantiating === true) {
        throw Error('Circular dependency detected');
      }
      registration.instantiating = true;
      _registerService(registration.registration);
      registration.instantiating = false;
    }
    return _registeredDependencies[key];
  } else {
    let registeredDependency = _registeredDependencies[key];
    if (registeredDependency === undefined || registeredDependency === null) {
      throw new Error(`Dependency ${key} has not been registered with the dependency container.`);
    }
    return registeredDependency;
  }
}

function isDependencyRegistered(dependency: any): boolean {
  return _registeredDependencies.hasOwnProperty(dependency.name);
}
  