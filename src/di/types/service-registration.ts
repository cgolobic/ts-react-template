export interface ServiceRegistration<T> {
  service: new (...params: any[]) => T
}