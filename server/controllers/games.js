/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len, prefer-arrow-callback */

import express from 'express';
import Game from '../models/game';
import bodyValidator from '../validators/games/body';
// import queryValidator from '../validators/bookmarks/query';
import paramsValidator from '../validators/games/params';
import moveBodyValidator from '../validators/games/move_body';
const router = module.exports = express.Router();

// index
// router.get('/', (req, res) => {
//   Player.find()
//           // .sort(res.locals.sort)
//           // .limit(res.locals.limit)
//           // .skip(res.locals.skip)
//           .exec((err, players) => {
//             res.send({ players });
//           });
// });

// show
// router.get('/:id', paramsValidator, (req, res) => {
//   Bookmark.findById(req.params.id, (err, bookmark) => {
//     res.send({ bookmark });
//   });
// });

// create new game
router.post('/', bodyValidator, (req, res) => {
  Game.create(req.body, (err, game) => {
    // console.log('new game:', game);
    game.createBoard();
    // console.log('new game with board:', game);
    game.save(function (err2, game2) {
      res.send({ game: game2 });
    });

  //   product.save(function (err, product, numAffected) {
  // if (err) ..
  // })
    // ToDo: invoke "build board" method, and SAVE
  });
});
// router.put('/:id/purchase', (req, res) => {
//   Seat.findByIdAndUpdate(req.params.id, { isPurchased: true }, (err1, seat) => {
//     Section.findById(req.body.sectid, (err2, section) => {
//       section.total += section.amount;
//       section.save(() => {
//         res.send({ section, seat });
//       });
//     });
//   });
// });
router.put('/:id/move', paramsValidator, moveBodyValidator, (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    // console.log('the game to move:', game);
    // console.log('req.params.id:', req.params.id);
    const piceIndex = game.board.findIndex(function (pice) {
      return (pice.x === Number(req.body.fromX) && pice.y === Number(req.body.fromY));
    });
    console.log('!piceIndex', !piceIndex);
    if (piceIndex === -1) {
      res.status(400).send({ messages: ['Pice not found'] });
    } else {
    // else
    // {
      console.log('found it!!! pice index:', piceIndex);
      game.board[piceIndex].x = req.body.toX;
      game.board[piceIndex].y = req.body.toY;
      game.save();
      res.send({ game });
    }
  });


    // Place.findOneAndUpdate({name:req.params.name}, req.body, function (err, place) {
    //   res.send(place);
    // });
  //   product.save(function (err, product, numAffected) {
  // if (err) ..
  // })
    // ToDo: invoke "build board" method, and SAVE
});
