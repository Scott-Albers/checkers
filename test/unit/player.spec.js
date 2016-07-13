/* eslint-disable no-unused-expressions, no-underscore-dangle */

const expect = require('chai').expect;
const Player = require('../../dst/models/player');
const sinon = require('sinon');

describe('Player', () => {
  beforeEach(() => {
    sinon.stub(Player, 'find').yields(null, []);
  });
  afterEach(() => {
    Player.find.restore();
  });
  describe('constructor', () => {
    it('should create a player object', (done) => {
      const player1 = new Player({ name: 'Charlie',
                              gamesWon: 0,
                              gamesLost: 0 });
      player1.validate(err => {
        // console.log('player1:', player1);
        expect(err).to.be.undefined;
        expect(player1.name).to.equal('Charlie');
        expect(player1.gamesWon).to.equal(0);
        expect(player1.gamesLost).to.equal(0);
        expect(player1._id).to.be.ok;
        // console.log('player1.dateCreated', player1.dateCreated);
        expect(player1.dateCreated).to.be.ok;
        done();
      });
    });
    it('should create a player object - default gamesWon to 0', (done) => {
      const player1 = new Player({ name: 'Charlie',
                              gamesLost: 0 });
      player1.validate(err => {
        // console.log('player1:', player1);
        expect(err).to.be.undefined;
        expect(player1.gamesWon).to.equal(0);
        done();
      });
    });
    it('should create a player object - default gamesLost to 0', (done) => {
      const player1 = new Player({ name: 'Charlie',
                              gamesWon: 0 });
      player1.validate(err => {
        // console.log('player1:', player1);
        expect(err).to.be.undefined;
        expect(player1.gamesLost).to.equal(0);
        done();
      });
    });
    it('should NOT create a player object - no name', (done) => {
      const player1 = new Player({ gamesWon: 0,
                              gamesLost: 0 });
      player1.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a player object - gamesWon < 0', (done) => {
      const player1 = new Player({ name: 'Charlie',
                              gamesWon: -5,
                              gamesLost: 0 });
      player1.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a player object - gamesLost < 0', (done) => {
      const player1 = new Player({ name: 'Charlie',
                              gamesWon: 0,
                              gamesLost: -6 });
      player1.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a player - duplicate player name', (done) => {
      Player.find.yields(null, [{ name: 'Scott' }]);
      const player1 = new Player({ name: 'Scott' });
      player1.validate(err => {
        expect(err).to.be.ok;
        sinon.assert.calledWith(Player.find, { name: 'Scott' });
        done();
      });
    });
  });
});
