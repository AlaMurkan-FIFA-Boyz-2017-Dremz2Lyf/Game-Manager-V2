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

## Testing:

This application uses Jest with enzyme for client, mocha and chai for server testing:

  - All tests are now in one script:

```
npm test
```

### Coverage
  - Server coverage is checked running tests, to get the client coverage run:  

```
npm run client:coverage
```


## Development:

Webpack 2.0 is the tool of choice for bundling. The devServer runs on port `8080` and proxies the server running on `4040`. To fire up the devServer use:

```
npm run dev
```

Then you can use nodemon for development:

```
npm run start:dev
```

And you should be good to go!

## Production:  
Using Heroku to deploy this app, but if you want to check that everything is running right in production:  
First set your `NODE_ENV` variable to production;  
```
export NODE_ENV=production
```  

When running production, you will need to set your DATABASE_URL variable. Contact:
[scotthorn0]: https://github.com/Scotthorn0  
To get it.

Then go ahead and bundle everything with  
```
npm run build
```  

and fire up the server!  
```
npm start
```

Please put in a PR if you have any questions or recommendations for improving this guide!
