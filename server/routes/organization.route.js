import express from 'express';
import expressJwt from 'express-jwt';
import config from '../../config/config';
import organizationCtrl from '../controllers/organization.controller';
// import config from '../../config/config';

const secret = {
  secret: config.jwtSecret
};

const router = express.Router(); // eslint-disable-line new-cap
router
  .route('/')
  /** POST /api/organizations - Create new organization */
  .post(expressJwt(secret), organizationCtrl.create)

  /** GET /api/organizations - Get organization robots */
  .get(organizationCtrl.getOrganizations);

router
  .route('/:name')
  /** GET /api/organizations - Get organization robots */
  .get(expressJwt(secret), organizationCtrl.getSingleOrganization)

  /** PATCH /api/robots - Update organization robots */
  .patch(expressJwt(secret), organizationCtrl.updateSingleOrganization)

  /** DELETE /api/robots - Update organization robots */
  .delete(expressJwt(secret), organizationCtrl.remove);

router.param('name', expressJwt(secret), organizationCtrl.load);

export default router;
