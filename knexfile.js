// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'v2'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'v2_test'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_URL
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ssl: true
  }

};
