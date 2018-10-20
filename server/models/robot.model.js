import mongoose from 'mongoose';

/**
 * Robot Schema
 */
const RobotSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * @typedef Robot
 */
export default RobotSchema; // mongoose.model('Robot', RobotSchema);
