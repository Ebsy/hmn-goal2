import express from 'express';
import expressJwt from 'express-jwt';
import userCtrl from '../controllers/user.controller';
import config from '../../config/config';

const secret = {
  secret: config.jwtSecret
};

const router = express.Router(); // eslint-disable-line new-cap
router
  .route('/')
  /** GET /api/robots - Get user robots */
  .get(expressJwt(secret), userCtrl.getRobots)

  /** PATCH /api/robots - Update user robots */
  .patch(expressJwt(secret), userCtrl.updateRobots);

export default router;
