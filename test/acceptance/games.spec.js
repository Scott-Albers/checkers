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
      // console.log('new game:', rsp.body.game);
      expect(rsp.body.game.board).to.be.length(24);
      expect(rsp.body.game.board[0].x).to.equal(2);
      expect(rsp.body.game.board[0].y).to.equal(1);
      expect(rsp.body.game.board[0].player).to.equal(1);
      expect(rsp.body.game.board[0].king).to.equal(false);
      done();
    });
  });
  it('should NOT create a new game - player 1 required', (done) => {
    request(app)
    .post('/games')
    .send({ player2Id: '0123456789012345678900a2' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(400);
      expect(rsp.body.messages[0]).to.equal('"player1Id" is required');
      done();
    });
  });
  it('should NOT create a new game - player 2 required', (done) => {
    request(app)
    .post('/games')
    .send({ player1Id: '0123456789012345678900a2' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(400);
      expect(rsp.body.messages[0]).to.equal('"player2Id" is required');
      done();
    });
  });
});

describe('put /games/:id/move', () => {
  it('should update the board', (done) => {
    request(app)
    .put('/games/5787b5fbc54646ba59b284cb/move')
    .send({ fromX: '1', fromY: '4', toX: '2', toY: '3' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(200);
      // console.log('new game:', rsp.body.game);
      expect(rsp.body.game.board[8].x).to.equal(2);
      expect(rsp.body.game.board[8].y).to.equal(3);
      done();
    });
  });
  it('should update the board back - TEMP', (done) => {
    request(app)
    .put('/games/5787b5fbc54646ba59b284cb/move')
    .send({ fromX: '2', fromY: '3', toX: '1', toY: '4' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(200);
      // console.log('new game:', rsp.body.game);
      expect(rsp.body.game.board[8].x).to.equal(1);
      expect(rsp.body.game.board[8].y).to.equal(4);
      done();
    });
  });
  it('should NOT move - game ID is invalid', (done) => {
    request(app)
    .put('/games/5787b5fbc54646ba59b284c/move')
    .send({ fromX: '2', fromY: '3', toX: '1', toY: '4' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(400);
      expect(rsp.body.messages[0]).to.contains('fails to match the required pattern');
      done();
    });
  });
  it('should NOT move - pice not found', (done) => {
    request(app)
    .put('/games/5787b5fbc54646ba59b284cb/move')
    .send({ fromX: '1', fromY: '1', toX: '8', toY: '8' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(400);
      expect(rsp.body.messages[0]).to.contains('Pice not found');
      done();
    });
  });
  it('should NOT move - fromX is invalid', (done) => {
    request(app)
    .put('/games/5787b5fbc54646ba59b284cb/move')
    .send({ fromX: '-1', fromY: '3', toX: '1', toY: '4' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(400);
      expect(rsp.body.messages[0]).to.contains('"fromX" must be larger than or equal to 1');
      done();
    });
  });
  it('should NOT move - fromY is invalid', (done) => {
    request(app)
    .put('/games/5787b5fbc54646ba59b284cb/move')
    .send({ fromX: '1', fromY: '-3', toX: '1', toY: '4' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(400);
      expect(rsp.body.messages[0]).to.contains('"fromY" must be larger than or equal to 1');
      done();
    });
  });
  it('should NOT move - toX is invalid', (done) => {
    request(app)
    .put('/games/5787b5fbc54646ba59b284cb/move')
    .send({ fromX: '1', fromY: '3', toX: '-1', toY: '4' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(400);
      expect(rsp.body.messages[0]).to.contains('"toX" must be larger than or equal to 1');
      done();
    });
  });
  it('should NOT move - toY is invalid', (done) => {
    request(app)
    .put('/games/5787b5fbc54646ba59b284cb/move')
    .send({ fromX: '1', fromY: '3', toX: '1', toY: '-4' })
    .end((err, rsp) => {
      // console.log('game rsp.body:', rsp.body);
      expect(err).to.be.null;
      expect(rsp.status).to.equal(400);
      expect(rsp.body.messages[0]).to.contains('"toY" must be larger than or equal to 1');
      done();
    });
  });
});
