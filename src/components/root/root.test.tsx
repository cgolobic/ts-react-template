import { expect } from 'chai';
import * as React from 'react';
import * as Sinon from 'sinon';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import { Root } from './root';
import { registerService, fetchDependency } from '../../di/container';
import { MockLoggerService } from '../../mocks/logger-service.mock';
import { LoggerService } from '../../services/logger-service';
import { TestingUtils } from '../../utils/testing-utils';
import { ApiClient } from '../../services/api-client-service';
import { MockApiClient } from '../../mocks/api-client-service.mock';

describe('Component: Root', () => {
  let wrapper: ShallowWrapper<any, any>;

  beforeEach(() => {
    registerService(LoggerService, MockLoggerService);
    registerService(ApiClient, MockApiClient);
    this.wrapper = TestingUtils.shallowRenderHoC(Root, []);
  });
  
  it('should increment count', () => {
    this.wrapper.setState({
      count: 0
    });
    this.wrapper.instance().incrementCounter();
    expect(this.wrapper.state('count')).to.equal(1);
  });

  it('should decrement count', () => {
    this.wrapper.setState({
      count: 1
    });    
    this.wrapper.instance().decrementCounter();
    expect(this.wrapper.state('count')).to.equal(0);
  });

  it('should get message from api', () => {
    // Manually call lifecycle method for shallow-rendered HoC to set up subscriptions
    this.wrapper.instance().componentDidMount();
    let expectedMessage = 'test message';
    fetchDependency(ApiClient.name)._getMessageResult = expectedMessage;
    this.wrapper.instance().getMessage();
    expect(this.wrapper.state('message')).to.equal(expectedMessage);
  })
})