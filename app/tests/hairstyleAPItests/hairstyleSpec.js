'use strict';

var Hairstyle = require('../../app/models/hairstylemodel');

describe("hairstyle Schema", function() {

  it("should create a hairstyle model", function() {
    var hairSample = new Hairstyle();

    expect(hairSample).toBeDefined();
    expect(typeof hairSample).toEqual(typeof {});
  });

  it("should connect to database", function() {
    var db = require('../../app/models/database.js');
    expect(typeof db).toEqual(typeof {});
    expect(db.url).toBeDefined();

  });


});
