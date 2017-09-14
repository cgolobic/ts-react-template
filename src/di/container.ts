import { ServiceRegistration } from './types/service-registration';
import { FunctionRegistration } from './types/function-registration';
var _registeredDependencies = {} as any;
var _providerInstantiationComplete = false;
var _providerMap: Map<string, ServiceRegistration> = new Map();

export function registerDependencyProviders (dependencyProviders: (ServiceRegistration | FunctionRegistration)[]) {
  _registeredDependencies = new Map();
  _providerInstantiationComplete = false;
  dependencyProviders
    .filter((provider: ServiceRegistration | FunctionRegistration) => provider.hasOwnProperty('service'))
    .forEach((provider: ServiceRegistration) => _providerMap.set(provider.service.name, provider));
  _providerMap.forEach((val: any) => {
    registerService(val);
  });
  _providerInstantiationComplete = true;
}

function registerService(serviceRegistration: ServiceRegistration): void {
  if (!isDependencyRegistered(serviceRegistration.service)) {
    if (serviceRegistration.overrideService !== undefined && serviceRegistration.overrideService !== null) {      
      _registeredDependencies[(serviceRegistration.service as any).name] = new serviceRegistration.overrideService();
    } else {
      _registeredDependencies[(serviceRegistration.service as any).name] = new serviceRegistration.service();
    }
  }
}

function registerFunction(functionRegistration: FunctionRegistration): void {
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
    if (_providerMap.get(key) === undefined) {
      throw Error();
    }
    if (!isDependencyRegistered(key)) {
      let registration = _providerMap.get(key);
      registerService(registration);
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
  