'use strict';

describe("hairstyle Schema", function() {

    var Db = require('mongodb'), mongoose = require('mongoose'),  db= mongoose.connection;
     var hairStyle = new mongoose.Schema({});
    it("should contain required dependencies", function() {
      

     expect(Db).toBeDefined(); 
     expect(mongoose).toBeDefined();
     expect(db).toBeDefined();      

  });

    it("should contain schema declaration", function() {

     expect(hairStyle).toBeDefined(); 
     expect(typeof hairStyle).toEqual(typeof {});

  });

    it("should export the schema model", function() {
    lmodule.exports = mongoose.model('Hair', hairStyle)

     expect(module.exports).toEqual(mongoose.model('Hair'))
  });

});

   
