# Getting Started

Install dependencies:

```
npm install
```

## Database

First you will need to make sure you have PostgreSQL installed on your computer. This application is set up for a database named `v2` for development, and `v2_test` for testing.
  * Note: [Postgres.app] is an awesome easy tool to run your postgres server. It is recommended for ease of use.
  * Production: Not yet in production, so database credentials are not in place yet.

[PostGres.app]: https://www.postgresql.org/download/macosx/

## Testing

### Front End
This application uses Jest with enzyme for front end testing:

  - To run the tests in watch mode use:

```
npm run test:client
```

  - To do a coverage check use:
  _If you have made changes to the UI you will need to update the snapshots, add '-- -u' do to so._

```
npm run test:coverage
```

### Backend
Mocha & chai are used for server and database testing.
_Remember to have your database up and running first._

```
npm run test:server
```

## Firing it up!

Webpack 2.0 is the tool of choice for bundling. The devServer runs on port `8080` and proxies the server running on `4040`. To fire up the devServer use:

```
npm run dev
```

Then you can use nodemon for development:

```
npm run start:dev
```

And you should be good to go!

Please put in a PR if you have any questions or recommendations for improving this guide!
