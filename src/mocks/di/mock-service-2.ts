import { Inject } from '../../di/inject';
import { ServiceRegistration } from '../../di/types/service-registration';
import { mockService1 } from './mock-service-1';

@Inject()
class mockService2_deps_1 {
  constructor(service1: mockService1) { }
}

export var mockService2_deps_1_Registration = {
  service: mockService2_deps_1
} as ServiceRegistration