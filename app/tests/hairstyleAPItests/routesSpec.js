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
        .post('/api')
        .set('Accept', 'application/json')
        .send(newHairstyle)
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
        .get('/api')
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

  describe("POST /", function() {

    beforeEach(function(done) {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      setTimeout(function() {
        console.log('inside timeout');
        done();
      }, 500);
    });

    it("should post hairstyle photos successfully", function(done) {
      request(app)
        .post('/')
        .field('hairPhoto', 'hairPhoto')
        .attach('hairPhoto', 'meme1.jpg')
        .set('Accept', 'application/json')
        .expect({
          success: true
        }, 200)
        .end(function(err, res) {
          if (err) return done(err);
          done()
        });

      done();
    });

  });

  describe("GET /", function() {

    beforeEach(function(done) {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      setTimeout(function() {
        console.log('inside timeout');
        done();
      }, 500);
    });

    it("should get hairstyle photos successfully ", function(done) {

      request(app)
        .get('/')
        .expect({
          success: true
        }, 200)
        .expect('Content-Type', /jpg/)
        .end(function(err, res) {
          if (err) return done(err);
          done()
        });
      done();
    });

  });
});
