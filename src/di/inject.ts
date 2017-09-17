import { fetchDependency } from './container';
import 'reflect-metadata';

export function Inject() {
  return function<T extends {new (...args: any[]): {}}>(constructor: T): T {
    return class extends constructor {
      constructor(...any: any[]) {
        var constructorParams: any[] = Reflect.getMetadata('design:paramtypes', constructor);
        let params: any[] = [];
        constructorParams.forEach((dep: any) => {
          params.push(fetchDependency(dep.name));
        });
        super(...params);
      }
    };
  }
}
