import { registerDependencyProviders, fetchDependency } from './container';
import { expect } from 'chai';
import * as Sinon from 'sinon';
import { mockService1_Registration } from '../mocks/di/mock-service-1';
import { mockService2_deps_1_Registration } from '../mocks/di/mock-service-2';
import { mockService3_deps_4_Registration, mockService3_deps_4 } from '../mocks/di/mock-service-3';
import { mockService4_deps_5_Registration } from '../mocks/di/mock-service-4';
import { mockService5_deps_3_circular_Registration } from '../mocks/di/mock-service-5';
import { NotRegisteredError, CircularDependencyError } from './types/errors';

describe('DI Container', () => {
  it ('should register and instantiate a service provider', () => {
    registerDependencyProviders([
      mockService1_Registration
    ]);
    let providerInstance = fetchDependency(mockService1_Registration.service.name);
    expect(providerInstance).to.be.not.undefined;
  });

  it ('should register and instantiate a service provider and its dependencies', () => {
    registerDependencyProviders([
      mockService2_deps_1_Registration,
      mockService1_Registration
    ]);
    let service1ProviderInstance = fetchDependency(mockService1_Registration.service.name);
    let service2ProviderInstance = fetchDependency(mockService2_deps_1_Registration.service.name);
    expect(service1ProviderInstance).to.be.not.undefined;
    expect(service2ProviderInstance).to.be.not.undefined;
  });

  it ('should throw an error when attempting to resolve a circular dependency', () => {
    expect(() => registerDependencyProviders([
      mockService3_deps_4_Registration,
      mockService4_deps_5_Registration,
      mockService5_deps_3_circular_Registration
    ])).to.throw(CircularDependencyError);
  });

  it ('should throw an error when attempting to resolve a circular dependency (out-of-order)', () => {
    expect(() => registerDependencyProviders([
      mockService3_deps_4_Registration,
      mockService5_deps_3_circular_Registration,
      mockService4_deps_5_Registration
    ])).to.throw(CircularDependencyError);
  });

  it ('should throw an error when attempting to instantiate a provider with unregistered dependencies', () => {
    expect(() => registerDependencyProviders([
      mockService3_deps_4_Registration,
      mockService4_deps_5_Registration
    ])).to.throw(NotRegisteredError);
  });

  it ('should throw an error when attempting to fetch an unregistered dependency provider', () => {
    registerDependencyProviders([
      mockService2_deps_1_Registration,
      mockService1_Registration
    ]);
    expect(() => fetchDependency(mockService3_deps_4.name)).to.throw(NotRegisteredError);
  });
});