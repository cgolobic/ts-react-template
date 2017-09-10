var _registeredDependencies = {} as any;

export function registerService(service: new (...params: any[]) => any, overrideService?: new (...params: any[]) => any): void {
  if (!isDependencyRegistered(service)) {
    if (overrideService !== undefined && overrideService !== null) {
      _registeredDependencies[(service as any).name] = new overrideService();
    } else {
      _registeredDependencies[(service as any).name] = new service();
    }
  }
}

export function registerFunction(func: Function, overrideFunc: Function = undefined): void {
  if (!isDependencyRegistered(func)) {
    if (overrideFunc !== undefined && overrideFunc !== null) {
      _registeredDependencies[func.name] = overrideFunc;
    } else {
      _registeredDependencies[func.name] = func;
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
  