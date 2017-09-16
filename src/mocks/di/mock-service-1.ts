import { Inject } from '../../di/inject';
import { ServiceRegistration } from '../../di/types/service-registration';

@Inject()
export class mockService1 {
  constructor() { }
}

export var mockService1_Registration = {
  service: mockService1
} as ServiceRegistration