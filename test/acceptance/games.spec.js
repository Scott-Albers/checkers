/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
// const cp = require('child_process');

describe('post /games', () => {
  it('should create a new game', (done) => {
    request(app)
    .post('/games')
    .send({ player1Id: '0123456789012345678900a1',
    player2Id: '0123456789012345678900a2' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(200);
      expect(rsp.body.game.__v).to.not.be.null;
      expect(rsp.body.game._id).to.not.be.null;
      expect(rsp.body.game.player1Id).to.equal('0123456789012345678900a1');
      expect(rsp.body.game.player2Id).to.equal('0123456789012345678900a2');
      done();
    });
  });
});
