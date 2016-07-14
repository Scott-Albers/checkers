/* eslint-disable no-unused-expressions, no-underscore-dangle */

const expect = require('chai').expect;
const Game = require('../../dst/models/game');
// const sinon = require('sinon');

describe('Game', () => {
  // beforeEach(() => {
  //   sinon.stub(Player, 'find').yields(null, []);
  // });
  // afterEach(() => {
  //   Player.find.restore();
  // });
  describe('constructor', () => {
    it('should create a game object', (done) => {
      const game1 = new Game({ player1Id: '0123456789012345678900a1',
      player2Id: '0123456789012345678900a2' });
      game1.validate(err => {
        // console.log('game1:', game1);
        expect(err).to.be.undefined;
        expect(game1._id).to.be.ok;
        expect(game1.player1Id).to.be.ok;
        expect(game1.player2Id).to.be.ok;
        expect(game1.active).to.equal(true);
        // console.log('new game:', game1);
        // expect(game1.board).to.be.length(24);
        // expect(game1.board[0].x).to.equal(2);
        // expect(game1.board[0].y).to.equal(1);
        // expect(game1.board[0].player).to.equal(1);
        // expect(game1.board[0].king).to.equal(false);
        // console.log('player1.dateCreated', player1.dateCreated);
        expect(game1.dateCreated).to.be.ok;
        done();
      });
    });
    it('should NOT create a game - player1 missing', (done) => {
      const game1 = new Game({ player2Id: '0123456789012345678900a2' });
      game1.validate(err => {
        // console.log('err:', err);
        expect(err).to.be.ok;
        // expect(err).to.contain('player 1 required.');
        // expect(game1._id).to.be.undefined;
        // expect(game1.player1Id).to.be.ok;
        done();
      });
    });
  });
});
