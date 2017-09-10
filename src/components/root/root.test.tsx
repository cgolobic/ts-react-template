import { expect } from 'chai';
import * as React from 'react';
import * as Sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { Root } from './root';
import { registerService } from '../../di/container';
import { MockLoggerService } from '../../mocks/logger-service.mock';
import { LoggerService } from '../../services/logger-service';

describe('Component: Root', () => {
  let wrapper: any;

  beforeEach(() => {
    registerService(LoggerService, MockLoggerService);
    this.wrapper = shallow(<Root title="" subtitle="" {...({} as any)} />).dive();
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
})