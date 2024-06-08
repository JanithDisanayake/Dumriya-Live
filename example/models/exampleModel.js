// Example model
class ExampleModel {
    constructor() {
      this.data = [];
    }
  
    getAll() {
      return this.data;
    }
  
    add(item) {
      this.data.push(item);
    }
  }
  
  module.exports = new ExampleModel();
s  