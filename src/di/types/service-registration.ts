export interface ServiceRegistration {
  service: new (...params: any[]) => any;
  overrideService?: new (...params: any[]) => any;
}