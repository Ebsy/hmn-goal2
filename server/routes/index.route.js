import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import robotRoutes from './robot.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET root - Check service health */
router.get('/', (req, res) => res.send('OK'));

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount robot routes at /robot
router.use('/robots', robotRoutes);

export default router;
