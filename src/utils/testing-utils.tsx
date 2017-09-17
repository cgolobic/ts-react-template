import { shallow, ShallowWrapper, ShallowRendererProps, mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

export class TestingUtils {
  public static shallowRenderHoC(
    renderedComponent: React.ComponentClass,
    componentProps: any[],
    shallowRendererProps?: ShallowRendererProps): ShallowWrapper<any, any> {
      let RenderedComponent: React.ComponentClass = renderedComponent;
      return shallow(<RenderedComponent {...componentProps} />, shallowRendererProps).dive();
  }
}