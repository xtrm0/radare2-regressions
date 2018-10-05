const parse = require('./parse');
const walk = require('walk').walk;
const path = require('path');

/* promise me magic */
const promiseConcurrency = 8;
const promiseLimit = require('promise-limit')
const limit = promiseLimit(promiseConcurrency)

module.exports = class NeoSuite {
  constructor(dbPath) {
    this.dbPath = dbPath;
  }

  load() {
    // walk subdirectories and parse the tests to get a huge array of tests
    const allTests = [];
    return new Promise((resolve, reject) => {
      let error = undefined
if (this.dbPath) {
  return resolve(parse(this.dbPath));
}
      const walker = walk(this.dbPath, {followLinks: false});
      walker.on('file', (root, stat, next) => {
        const fileName = path.join(this.dbPath, stat.name);
        try {
          const tests = parse(fileName);
          allTests.push(...tests);
        } catch (e) {
          error = e;
          console.error(e);
        }
        next();
      });
      walker.on('end', () => {
        if (error) {
          return reject(error);
        }
        resolve(allTests);
      });
    });
  }
}
