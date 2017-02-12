const axios = require('axios');

exports.create = function(route) {
  let Model = {};

  //
  // Handle validation on the input.
  //
  if (typeof route !== 'string') {
    throw new TypeError('Route must be a string', 'axios_model.js', 8);
  }

  //
  // Initialize with methods common across all models
  //
  const methods = {

    /*
      'all' method is simple, requests all the data from the current route.
      Arguments:
        - none
      Returns:
        - all data (as <Array>) of <Objects>
    */
    all: function() {
      return axios.get(route).then(res => {
        return res.data;
      });
    },

    /*
      'create' method posts data to the current route, posts the corresponding data to the current route.
      Arguments:
        - <Object> of attrs to be posted to the route
      Returns:
        - something.....?
    */
    create: function(attrs) {
      return axios.post(route, attrs);
    },

    /*
      'find' method requests data from the current route.
      Arguments:
        - attrs <Object>
      Returns:
        - data corresponding to the attrs passed in as <Array> of <Objects>
    */
    find: function(attrs) {
      return axios.get(route, {params: attrs});
    },

    /*
      'findById' method requests data from the current route.
      Arguments:
        - ids <Number/Sring> or <Array>
      Returns:
        - data corresponding to the attrs passed in as <Array> of <Objects>
    */
    findById: function(ids) {
      if (typeof ids === 'number' || Array.isArray(ids)) {
        return Model.find({id: ids});
      } else {
        throw new TypeError('findById requires an argument of a single ID <Number> or <String> or an <Array> of IDs:', 'axios_model.js', 26);
      }
    },

    /*
      'updateOne' method updates data from the current route.
      Arguments:
        - attrs <Object>
      Returns:
        - something....?
    */
    updateOne: function(attrs) {
      return axios.put(route, attrs);
    }

  };

  Model = Object.create(methods);

  Model.route = route;

  Model.methods = methods;


  return Model;
};
