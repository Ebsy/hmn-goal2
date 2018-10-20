import Organization from '../models/organization.model';

const debug = require('debug')('hmn-goal2:organizationCtrl'); // eslint-disable-line

function load(req, res, next, id) {
  Organization.get(id)
    .then(organization => {
      req.organization = organization; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Create new organization
 * @property {string} req.body.name - Organization name.
 * @property {string} req.body.address - Organization address.
 * @returns {Organization}
 */
function create(req, res, next) {
  const organization = new Organization({
    name: req.body.name,
    address: req.body.address
  });

  organization
    .save()
    .then(() =>
      res.status(200).json({
        message: 'Organization created successfully'
      })
    )
    .catch(e => next(e));
}

function getOrganizations(req, res, next) {
  // DO A LIST!
  Organization.get(req.organization.name)
    .then(organization => res.json(organization.robots))
    .catch(e => next(e));
}

/**
 * Delete organization.
 * @returns 204 status
 */
function remove(req, res, next) {
  Organization.remove(req.params.name)
    .then(() => res.status(204).send())
    .catch(e => next(e));
}

/**
 * Get organization
 * @returns {Organization}
 */
function getSingleOrganization(req, res, next) {
  // return res.json(req.organization);
  return Organization.get(req.params.name)
    .then(organization => res.json(organization))
    .catch(e => next(e));
}

function updateSingleOrganization(req, res, next) {
  debug(req.params);
  return Organization.updateSingle(req.params.name, req.body.address)
    .then(organization => res.json(organization))
    .catch(e => next(e));

  // const newAddress = req.body.address;

  // const { organization } = req;
  // organization.address = newAddress;

  // return organization
  //   .save()
  //   .then(() => res.json(req.organization))
  //   .catch(e => next(e));
}

export default {
  load,
  create,
  getOrganizations,
  getSingleOrganization,
  updateSingleOrganization,
  remove
};
