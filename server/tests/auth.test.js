import request from 'supertest';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import chai, { expect } from 'chai';
import app from '../../index';
import config from '../../config/config';

chai.config.includeStack = true;

describe('## Auth APIs', () => {
  const validUserCredentials = {
    email: 'neilneilneil1w1wwqwqwqweqeqe@mncxmcnxmncmxnctest.com',
    password: 'test'
  };

  const robot = {
    robot: {
      title: 'test',
      done: false
    }
  };

  let jwtToken;

  describe('## User APIs', () => {
    describe('# POST /api/users', () => {
      it('should create a new user', done => {
        request(app)
          .post('/api/users')
          .send(validUserCredentials)
          .expect(httpStatus.OK)
          .then(res => {
            expect(res.body.message).to.equal('User created successfully');
            done();
          })
          .catch(done);
      });
    });
  });

  describe('# POST /api/auth/login', () => {
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

    it('should return Authentication error - wrong password', done => {
      request(app)
        .post('/api/auth/login')
        .send(
          Object.assign(validUserCredentials, {
            password: 'fail'
          })
        )
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.message).to.equal('Authentication error');
          done();
        })
        .catch(done);
    });
  });

  describe('# PATCH /api/robots', () => {
    it('should update user robots', done => {
      request(app)
        .patch('/api/robots')
        .set('Authorization', jwtToken)
        .send(robot)
        .expect(httpStatus.OK)
        .then(res => {
          // eslint-disable-next-line
          expect(res.body[0].title).to.equal(robot.robot.title);
          done();
        })
        .catch(done);
    });
  });

  // describe('# DELETE /api/users', () => {
  //   it('should delete user', done => {
  //     request(app)
  //       .delete('/api/users')
  //       .set('Authorization', jwtToken)
  //       .expect(httpStatus.NO_CONTENT)
  //       .then(() => {
  //         // expect(res.body.message)
  //         //   .to.equal('');
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });
});
