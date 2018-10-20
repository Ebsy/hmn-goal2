import express from 'express';
import organizationCtrl from '../controllers/organization.controller';
// import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap
router
  .route('/')
  /** POST /api/organizations - Create new organization */
  .post(organizationCtrl.create)

  /** GET /api/organizations - Get organization robots */
  .get(organizationCtrl.getOrganizations);

router
  .route('/:name')
  /** GET /api/organizations - Get organization robots */
  .get(organizationCtrl.getSingleOrganization)

  /** PATCH /api/robots - Update organization robots */
  .patch(organizationCtrl.updateSingleOrganization)

  /** DELETE /api/robots - Update organization robots */
  .delete(organizationCtrl.remove);

router.param('name', organizationCtrl.load);

export default router;
