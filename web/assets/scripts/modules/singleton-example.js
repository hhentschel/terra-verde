class SingletonExample {
  constructor() {
    this.id = Math.random();
  }

  getId() {
    return this.id;
  }
}

// export as singleton
export default new SingletonExample();
