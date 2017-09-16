export class NotRegisteredError extends Error {
  constructor(dependencyName: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'NotRegisteredError';
    this.message = `Provider for dependency ${dependencyName} has not been registered.`;
  }
}

export class CircularDependencyError extends Error {
  constructor() {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'CircularDependencyError';
    this.message = 'Circular dependency detected.';
  }
}