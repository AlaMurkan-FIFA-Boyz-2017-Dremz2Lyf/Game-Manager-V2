const driver = require(__client + '/axios_model/lib/axios_model.js');

// NOTE: Axios is required here to pass it to the mock adapter function.
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This lets us test our axios requests easily.
let mock = new MockAdapter(axios);

// setup our test routes and methods
mock.onGet('/test').reply((config) => {
  if (!config.params) {
    return [200, mockData.test.existing];
  } else if (config.params.id === 1) {
    return [200, mockData.test.existing[0]];
  } else if (config.params.id === 3) {
    return [200, mockData.test.existing[2]];
  }
})
.onPost('/test').reply(201, 'Created')
.onPut('/test').reply((config) => {
  return [202, {id: 1}];
});


describe('Axios Model', function() {

  it('should have a create method', function() {
    expect(typeof driver.create).toBe('function');
  });

  let route = '/test';

  let testModel = driver.create(route);

  it('should create a new front end model', function() {

    expect(testModel.route).toBeDefined();
    expect(testModel.route).toBe(route);
  });

  it('should only accept a route as a string', function() {

    expect(driver.create.bind(driver, 4)).toThrowError(TypeError);
    expect(driver.create.bind(driver, 4)).toThrowError(/must be a string/);
  });

  describe('all method', function() {
    it('should have an "all" method', function () {
      expect(typeof testModel.all).toBe('function');
    });

    it('should respond with all the data for the defined model', function(done) {

      testModel.all().then(res => {
        expect(res).toMatchObject(mockData.test.existing);
        done();
      }).catch(err => {
        throw err;
        done();
      });
    });

  });

  describe('create method', function() {
    it('should have an "create" method', function () {
      expect(typeof testModel.create).toBe('function');
    });

    it('should respond with 201 and "Created" when called', function(done) {

      let attrs = {
        id: 3,
        Laborum: 'Pariatur ad non nostrud incididunt eiusmod',
        veniam: 'aliquip sint ipsum labore exercitation amet eu.'
      };

      testModel.create(attrs).then(res => {
        expect(res.status).toBe(201);
        expect(res.data).toBe('Created');
        done();
      }).catch(err => {
        throw err;
        done();
      });
    });

  });

  describe('findById method', function() {
    it('should have an "findById" method', function () {
      expect(typeof testModel.findById).toBe('function');
    });

    it('should respond with 200 when called with an attributes object', (done) => {

      testModel.findById({id: 1}).then(res => {
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(1);
        done();
      }).catch(err => {
        throw err;
        done();
      });
    });

  });

  describe('updateOne method', function() {

    it('should have a "updateOne" method', function() {
      expect(typeof testModel.updateOne).toBe('function');
    });

    it('should respond with 202 and the item id', function() {
      return testModel.updateOne(mockData.test.updated).then(res => {

        let body = res.data;

        expect(res.status).toBe(202);
        expect(body.id).toBe(1);
      });
    });
  });

});
