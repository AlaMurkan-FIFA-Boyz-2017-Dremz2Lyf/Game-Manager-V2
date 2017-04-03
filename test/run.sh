
export NODE_ENV="test"; nyc --reporter=html ./node_modules/.bin/mocha --recursive -r test/bootstrap.js "$@"
