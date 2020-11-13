import SingletonExample from './singleton-example.js';

export class MultipleExportClass {
  constructor() {
    this.id = Math.random();
  }

  getId() {
    return this.id;
  }
}

export const MultipleExportConst = 'a const';

export function getSingletonId() {
  return SingletonExample.getId();
}
