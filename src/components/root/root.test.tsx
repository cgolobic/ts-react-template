import { expect } from 'chai';
import * as React from 'react';
import * as Sinon from 'sinon';
import { mount } from 'enzyme';
import { Root } from './root';

describe('Component: Root', () => {
  let wrapper: any;

  beforeEach(() => {
    this.wrapper = mount(<Root title="" subtitle="" />);
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