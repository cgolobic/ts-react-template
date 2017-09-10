import { ServiceRegistration } from './types/service-registration';
import { FunctionRegistration } from './types/function-registration';
var _registeredDependencies = {} as any;

export function registerService(serviceRegistration: ServiceRegistration): void {
  if (!isDependencyRegistered(serviceRegistration.service)) {
    if (serviceRegistration.overrideService !== undefined && serviceRegistration.overrideService !== null) {      
      _registeredDependencies[(serviceRegistration.service as any).name] = new serviceRegistration.overrideService();
    } else {
      _registeredDependencies[(serviceRegistration.service as any).name] = new serviceRegistration.service();
    }
  }
}

export function registerFunction(functionRegistration: FunctionRegistration): void {
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
  if (registeredDependency === undefined || registeredDependency === null) {
    throw new Error(`Dependency ${key} has not been registered with the dependency container.`);
  }
  return registeredDependency;
}

function isDependencyRegistered(dependency: any): boolean {
  return _registeredDependencies.hasOwnProperty(dependency.name);
}
  