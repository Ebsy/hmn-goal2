import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const debug = require('debug')('hmn-goal2:organizationModel'); // eslint-disable-line

/**
 * Organization Schema
 */
const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  }
  //   robots: [robot]
});

/**
 * Statics
 */
OrganizationSchema.statics = {
  /**
   * Get organization
   * @param {String} name - The name of organization.
   * @returns {Promise<Organization, APIError>}
   */
  get(name) {
    return this.findOne({
      name
    })
      .exec()
      .then(organization => {
        if (organization) {
          return organization;
        }
        const err = new APIError('No such organization exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  updateSingle(name, newAddress) {
    debug(newAddress);
    return this.findOneAndUpdate({ name }, { $set: { address: newAddress } }, { new: true })
      .exec()
      .then(organization => {
        if (organization) {
          return organization;
        }
        const err = new APIError('No such organization exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  remove(name) {
    return this.findOneAndRemove({
      name
    })
      .exec()
      .then(() => Promise.resolve());
  }
};

/**
 * @typedef Organization
 */
export default mongoose.model('Organization', OrganizationSchema);
