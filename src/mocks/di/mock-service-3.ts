import { Inject } from '../../di/inject';
import { mockService4_deps_5 } from './mock-service-4';
import { ServiceRegistration } from '../../di/types/service-registration';

@Inject()
export class mockService3_deps_4 {
  constructor(service4: mockService4_deps_5) { }
}

export var mockService3_deps_4_Registration = {
  service: mockService3_deps_4
} as ServiceRegistration