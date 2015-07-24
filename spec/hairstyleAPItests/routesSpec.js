'use strict';

var 

describe("hairstyle API routes", function() {

    var express = require('express'), router = express.Router();
    var Hair = require('../models/hairstylemodel');
    it("should contain required dependencies", function() {
      

     expect(express).toBeDefined(); 
     expect(router).toEqual(express.Router());
     expect(Hair).toBeDefined();      
  });

    it("should connect when called", function() {

     expect(router.use).toBeDefined(); 

  });

    it("should post and get hairstyle data", function() {
    expect(router.use).toBeDefined();         

  });

});

   
