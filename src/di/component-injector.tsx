import * as React from 'react';
import { fetchDependency } from './container';
import 'reflect-metadata';
import { PropInjectorDependency } from './types/prop-injector-dependency';

export function InjectProps(dependencies: PropInjectorDependency[]) {
  return function (target: React.ComponentClass): any {
    return class extends React.Component<any, any> {
      _internalComponent: React.ComponentClass = target;
      _injectionComplete: boolean = false;
      _injectedProps: any = {};
      render() {
        if (!this._injectionComplete) {
          dependencies.forEach((dependency: any) => {
            let propKey = dependency.inject.name;
            if (dependency.hasOwnProperty('propName')) {
              propKey = dependency.propName;
            }
            this._injectedProps[propKey] = fetchDependency(dependency.inject.name);
          });
          this._injectionComplete = true;
        }
        return(<this._internalComponent {...this.props} {...this.state} {...this._injectedProps} />);
      }
    }
  }
}