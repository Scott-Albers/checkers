/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');

describe('players', () => {
  beforeEach((done) => {
    // cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
    cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, (err, a, b) => {
      console.log(err, a, b);
      done();
    });
  });

  describe('get /players', () => {
    it('should get all the players', (done) => {
      request(app)
      .get('/players')
      .end((err, rsp) => {
        // console.log('response.body:', rsp.body);
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.players).to.have.length(2);
        done();
      });
    });
  });
});

describe('post /players', () => {
  it('should create a player', (done) => {
    request(app)
    .post('/players')
    .send({ name: 'Joe' })
    .end((err, rsp) => {
      expect(err).to.be.null;
      expect(rsp.status).to.equal(200);
      // expect(rsp.body.player.__v).to.not.be.null;
      expect(rsp.body.player._id).to.not.be.null;
      expect(rsp.body.player.name).to.equal('Joe');
      done();
    });
  });
});
