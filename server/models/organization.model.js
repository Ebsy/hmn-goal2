import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

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
   * @param {ObjectId} id - The objectId of organization.
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
