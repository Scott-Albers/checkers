/* eslint-disable no-use-before-define */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  player1Id: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  player2Id: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  dateCreated: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  board: [{ x: Number, y: Number, player: Number, king: Boolean }],
});

// function duplicatePlayerNameValidator(name, cb) {
//   this.model('Player').find({ name }, (err, players) => {
//     cb(!players.length);
//   });
// }

module.exports = mongoose.model('Game', gameSchema);
