import { Inject } from '../../di/inject';
import { mockService3_deps_4 } from './mock-service-3';
import { ServiceRegistration } from '../../di/types/service-registration';

@Inject()
export class mockService5_deps_3_circular {
  constructor(service3: mockService3_deps_4) { }
}

export var mockService5_deps_3_circular_Registration = {
  service: mockService5_deps_3_circular
} as ServiceRegistration