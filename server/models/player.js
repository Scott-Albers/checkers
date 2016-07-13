/* eslint-disable no-use-before-define */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String, required: true, validate: duplicatePlayerNameValidator },
  gamesWon: { type: Number, min: 0, default: 0 },
  gamesLost: { type: Number, min: 0, default: 0 },
  dateCreated: { type: Date, default: Date.now },
});

function duplicatePlayerNameValidator(name, cb) {
  this.model('Player').find({ name }, (err, players) => {
    cb(!players.length);
  });
}

module.exports = mongoose.model('Player', playerSchema);
