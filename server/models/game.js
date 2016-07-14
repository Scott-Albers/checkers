/* eslint-disable no-use-before-define */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  player1Id: { type: mongoose.Schema.ObjectId, ref: 'Player', required: true },
  player2Id: { type: mongoose.Schema.ObjectId, ref: 'Player', required: true },
  dateCreated: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  board: [{ x: Number, y: Number, player: Number, king: Boolean }],
});

gameSchema.methods.createBoard = function () {
  this.board.push({ x: 2, y: 1, player: 1, king: false });
  this.board.push({ x: 4, y: 1, player: 1, king: false });
  this.board.push({ x: 6, y: 1, player: 1, king: false });
  this.board.push({ x: 8, y: 1, player: 1, king: false });
  this.board.push({ x: 1, y: 2, player: 1, king: false });
  this.board.push({ x: 3, y: 2, player: 1, king: false });
  this.board.push({ x: 5, y: 2, player: 1, king: false });
  this.board.push({ x: 7, y: 2, player: 1, king: false });
  this.board.push({ x: 2, y: 3, player: 1, king: false });
  this.board.push({ x: 4, y: 3, player: 1, king: false });
  this.board.push({ x: 6, y: 3, player: 1, king: false });
  this.board.push({ x: 8, y: 3, player: 1, king: false });
  this.board.push({ x: 1, y: 6, player: 2, king: false });
  this.board.push({ x: 3, y: 6, player: 2, king: false });
  this.board.push({ x: 5, y: 6, player: 2, king: false });
  this.board.push({ x: 7, y: 6, player: 2, king: false });
  this.board.push({ x: 2, y: 7, player: 2, king: false });
  this.board.push({ x: 4, y: 7, player: 2, king: false });
  this.board.push({ x: 6, y: 7, player: 2, king: false });
  this.board.push({ x: 8, y: 7, player: 2, king: false });
  this.board.push({ x: 1, y: 8, player: 2, king: false });
  this.board.push({ x: 3, y: 8, player: 2, king: false });
  this.board.push({ x: 5, y: 8, player: 2, king: false });
  this.board.push({ x: 7, y: 8, player: 2, king: false });
  // this.save();
};

// gameSchema.methods.basicMove = function (player, x1, y1, x2, y2) {
//   //args: player, current coordinates, new coordinates
//   //find player + current coordinates, then update the coordinates
//
// };
// function duplicatePlayerNameValidator(name, cb) {
//   this.model('Player').find({ name }, (err, players) => {
//     cb(!players.length);
//   });
// }

module.exports = mongoose.model('Game', gameSchema);
