const db = require('../../db');

exports.create = function (modelName, options = {}) {
  let Model, methods;

  let tableName = options.tableName || null;
  let idColumn = options.idColumn || 'id';

  if ( ! tableName ) {
    throw new Error('[knex_model.js] You must specify a tableName', 'knex_model.js', 3);
  }
  //
  // Initialize with methods common across all models
  //
  methods = {

    /*
      'all' method is simple, selects all from the correct table.
      Arguments:
        - none
      Returns:
        - all rows (as <Object>) from the specific table <Array>
    */
    all: function () {
      return db(tableName).select('*');
    },

    /*
      'find' method uses the findBy method below to find a row matching the id.
      Arguments:
        - id <Number>
      Returns:
        - a single row <Object> from the specific table <Array>
    */
    find: function (id) {
      return Model.findBy({ [idColumn]: id });
    },

    /*
      'findBy' method uses any attributes to find the matching rows.
      Arguments:
        - attrs <Object>
      Returns:
        - rows as <Object> from the specific table. <Array>
    */
    findBy: function (attrs) {
      return db(tableName).select('*').where(attrs)
        .then(function(rows) {
          return (rows.length === 0) ? Promise.reject(new Model.NotFound) : rows;
        });
    },

    /*
      'save' method uses either the 'save' or 'create' attributes to find matching rows.
      Arguments:
        - attrs <Object>
      Returns:
        - if the passed attrs object has an 'id' key, it will call 'updateOne'
          which returns the attributes <Object>
        - otherwise it will call 'create' with returns the new row
          with the 'id' and passed attrs <Object>
    */
    save: function (attrs) {
      return attrs[idColumn] ? Model.updateOne(attrs) : Model.create(attrs);
    },

    /*
      'create' method accepts attributes to make a new row.
      Arguments:
        - attrs <Object>
      Returns:
        - the new row with the new 'id' and passed attrs <Object>
    */
    create: function (attrs) {
      attrs.createdAt = new Date();
      return db(tableName).insert(attrs).returning(idColumn)
        .then(function (rows) {
          return Object.assign({ [idColumn]: rows[0] }, attrs);
        });
    },

    /*
      'updateOne' method accepts attributes to update a new row.
      Arguments:
        - attrs <Object>
      Returns:
        - the passed attrs <Object>
    */
    updateOne: function (attrs) {
      if (! attrs[idColumn]) {
        return Promise.reject(new Model.InvalidArgument(`${idColumn}_is_required`));
      }

      attrs.updatedAt = new Date();
      return db(tableName).update(attrs).where({ [idColumn]: attrs[idColumn] })
        .then(function(affectedCount) {
          return (affectedCount === 0) ? Promise.reject(new Model.NotFound) : attrs;
        });
    },

    /*
      'delete' method accepts an id to delete a row.
      Arguments:
        - id <Number>
      Returns:
        - the number of rows affected <Number>
    */
    delete: function (id) {
      return db(tableName).where({ [idColumn]: id }).delete();
    }
  };

  //
  // Construct an object with methods as its prototype to make overriding easier
  //
  Model = Object.create(methods);
  Model.methods = methods;

  //
  // Custom Errors (useful for handling via Promise#catch)
  //
  Model.NotFound = class NotFound extends Error {
    constructor() {
      super(`${modelName}: not found.`);
      this.type = 'not_found';
      this.meta = { model: modelName };
    }
  };

  Model.InvalidArgument = class InvalidArgument extends Error {
    constructor(message) {
      super(`${modelName}: ${message}`);
      this.type = 'invalid_argument';
      this.meta = { model: modelName };
    }
  };

  return Model;
};
