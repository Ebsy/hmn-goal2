import bcrypt from 'bcrypt';
import User from '../models/user.model';

const debug = require('debug')('hmn-goal2:userCtrl'); // eslint-disable-line

/**
 * Create new user
 * @property {string} req.body.email - User email.
 * @property {string} req.body.password - User password.
 * @returns {User}
 */
function create(req, res, next) {
  const salt = bcrypt.genSaltSync(10);
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt)
  });

  user
    .save()
    .then(() =>
      res.status(200).json({
        message: 'User created successfully'
      })
    )
    .catch(e => next(e));
}

function getRobots(req, res, next) {
  User.get(req.user.email)
    .then(user => res.json(user.robots))
    .catch(e => next(e));
}

/**
 * Update user robots
 * @property {string} req.body.robot - The new robot.
 * @returns {User.robots}
 */
function updateRobots(req, res, next) {
  const { robot } = req.body;
  const { email } = req.user;

  User.updateRobots(email, robot)
    .then(updatedUser => {
      res.json(updatedUser.robots);
    })
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns 204 status
 */
function remove(req, res, next) {
  const { email } = req.user;
  debug(email);
  User.remove(email)
    .then(() => res.status(204).send())
    .catch(e => next(e));
}

export default {
  getRobots,
  create,
  updateRobots,
  remove
};
