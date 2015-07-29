'use strict';

var request = require('supertest');
var express = require('express');
var app = require('../../../server.js');

describe("hairstyle API routes", function() {

  describe("POST /api", function() {

    beforeEach(function(done) {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      setTimeout(function() {
        console.log('inside timeout');
        done();
      }, 500);
    });

    it("should post successfully", function(done) {
      
      //demo hairModel to test
      var newHairstyle = {
        name: 'sampleHair',
        date: Date.now(),
        details: 'test hair posting',
        meta: {
          Likes: 5,
          Dislikes: 1
        },
        comments: {
          user: 'sampleUser',
          commentText: 'none',
          date: Date.now()
        },
        saloonList: {
          saloonName: 'Our saloon',
          saloonAddress: 'Address sample'
        }
      };
      request(app)
        .post('/api/hairstyle/')
        .set('Accept', 'application/json')
        .send(newHairstyle)
        .field('hairPhoto', 'hairImage')
        .attach('hairPhoto', 'hair_henna.jpg')
        .expect({
          success: true
        }, 200)
        .end(function(err, res) {
          if (err) return done(err);
          done()
        });
      done();
    });

    it("should post hairstyle details as a JSON object", function(done) {

      request({
        url: 'http://locahost:8080/api',
        method: 'POST'
      }, function(error, response, body) {
        if (error) {
          console.log(error);
          done(error);
        } else {
          expect(typeof response).toEqual(typeof {});
        }
      });
      done();
    });
  });

  describe("GET /api", function() {

    beforeEach(function(done) {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      setTimeout(function() {
        console.log('inside timeout');
        done();
      }, 500);
    });

    it("should get successfully ", function(done) {

      request(app)
        .get('/api/hairstyle')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({
          name: 'sampleHair',
          details: 'test hair posting'
        })
        .end(function(err, res) {
          if (err) return done(err);
          done()
        });
      done();
    });

    it("should return hairstyle details as a JSON object", function(done) {

      request('http://locahost:8080/api', function(error, response, body) {
        expect(typeof response).toEqual(typeof JSON);
        console.log(response);

      });
      done();
    });
  });

  describe("Requests on specific Hairstyles", function() {

    beforeEach(function(done) {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      setTimeout(function() {
        console.log('inside timeout');
        done();
      }, 500);
    });

    it("should get hairsyle by name succesfully successfully ", function(done) {

      request(app)
        .get('/api/hairstyle/:id')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({
          name: 'sampleHair',
          details: 'test hair posting'
        })
        .end(function(err, res) {
          if (err) return done(err);
          done()
        });
      done();
    });

    it("should update Hairstyle details", function(done) {

      var newHairstyle = {
        date: Date.now(),
        details: 'new Hair details'
      }

      request(app)
        .put('/api/hairstyle/:id')
        .expect(200)
        .send(newHairstyle.details, newHairstyle.date)
        .expect({
          success: true
        })
        .end(function(err, res) {
          if (err) return done(err);
          done()
        });
      done();
    });

    it("should remove Hairstyle details", function(done) {
      request(app)
        .delete('/api/hairstyle/:id')
        .expect(200)
        .expect({
          success: true
        })
        .end(function(err, res) {
          if (err) return done(err);
          done()
        });
    });
  });

});
