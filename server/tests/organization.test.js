import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import config from '../../config/config';

chai.config.includeStack = true;

describe('## Organizations API', () => {
  // after(done => {
  //   mongoose.connection.db.dropCollection('organizations', done);
  // });

  after(done => {
    mongoose.connection.db.dropDatabase(done);
  });

  let jwtToken;

  const validUserCredentials = {
    email: 'neilneilneil1w1wwqwqwqweqeqe@mncxmcnxmncmxnctest.com',
    password: 'test'
  };

  const testOrganization01 = {
    name: 'testcompany1',
    address: '127 Test Street, Test City, UK'
  };

  const testOrganizationUpdate = {
    address: '27 Updated Street, Test Town, AT'
  };

  describe('# POST /api/organizations', () => {
    it('should get valid JWT token', done => {
      request(app)
        .post('/api/auth/login')
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.property('token');
          jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
            // eslint-disable-next-line no-unused-expressions
            expect(err).to.not.be.ok;
            expect(decoded.email).to.equal(validUserCredentials.email);
            jwtToken = `Bearer ${res.body.token}`;
            done();
          });
        })
        .catch(done);
    });

    it('should create a new organization', done => {
      request(app)
        .post('/api/organizations')
        .set('Authorization', jwtToken)
        .send(testOrganization01)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.message).to.equal('Organization created successfully');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/organizations/:name', () => {
    it('should get the named organization', done => {
      request(app)
        .get(`/api/organizations/${testOrganization01.name}`)
        .set('Authorization', jwtToken)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal(testOrganization01.name);
          done();
        })
        .catch(done);
    });
  });

  describe('# PATCH /api/organizations/:name', () => {
    it('should update named organization', done => {
      request(app)
        .patch(`/api/organizations/${testOrganization01.name}`)
        .set('Authorization', jwtToken)
        .send(testOrganizationUpdate)
        .expect(httpStatus.OK)
        .then(res => {
          // eslint-disable-next-line
          expect(res.body.address).to.equal(testOrganizationUpdate.address);
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/organization/', () => {
    it('should delete named organization', done => {
      request(app)
        .delete(`/api/organizations/${testOrganization01.name}`)
        .set('Authorization', jwtToken)
        .expect(httpStatus.NO_CONTENT)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });
});
