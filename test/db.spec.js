const path = require('path');
const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/mongo_exercises';

describe('Mongo Exercises collection', function main() {
  this.timeout(12000);
  this.slow(4000);

  beforeEach(() => {
    // setup
  });

  it('should be able to connect to db without error', (done) => {
    MongoClient.connect(url, (err, db) => {
      expect(err).to.equal(null);
      db.close();
      done();
    });
  });

  it('should be able to find documents in movie collection ', (done) => {
    MongoClient.connect(url, (err, db) => {
      expect(err).to.equal(null);
      let collection = db.collection('movies');
      collection.find({}).toArray((err, docs) => {
        expect(err).to.equal(null);
        expect(docs.length).to.be.greaterThan(0);
        done();
      });
    });
  });
});
