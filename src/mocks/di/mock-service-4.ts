import { Inject } from '../../di/inject';
import { mockService5_deps_3_circular } from './mock-service-5';
import { ServiceRegistration } from '../../di/types/service-registration';

@Inject()
export class mockService4_deps_5 {
  constructor(service5: mockService5_deps_3_circular) { }
}

export var mockService4_deps_5_Registration = {
  service: mockService4_deps_5
} as ServiceRegistration