'use strict';

describe("hairstyle API routes", function() {

    var express = require('express'), router = express.Router();
    var Hair = require('../models/hairstylemodel');
    it("should contain required dependencies", function() {
      

     expect(express).toBeDefined(); 
     expect(router).toEqual(express.Router());
     expect(Hair).toBeDefined();      
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

   
