import * as React from 'react';
import { fetchDependency } from './container';
import 'reflect-metadata';

export function ComponentInjector<P, S>(InputTemplate: React.ComponentClass<P>, dependencies: any[]): React.ComponentClass<P> {
  return class extends React.Component<P, S> {
    render() {
      let _deps: any = { deps: {} };
      dependencies.forEach((dep: any) => {
        if(dep.hasOwnProperty('propName')) {
          _deps.deps[dep.propName] = fetchDependency(dep.inject.name);
        } else {
          _deps.deps[dep.inject.name] = fetchDependency(dep.inject.name);
        }
      });
      return(
        <InputTemplate {...this.state} {...this.props} {..._deps}/>
      )
    }
  }
}

export function InjectComponent() {
  return function (target: React.ComponentClass): any {
    return class test extends React.Component<any, any> {
      _internalComponent: React.ComponentClass = target;
      render() {
        return(<this._internalComponent {...this.props} {...this.state} />);
      }
    }
  }
}