import {Router} from 'express';
import { registerUser, loginUser, refreshAccessToken, getUserProfile, logoutUser } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/logout').post(authMiddleware, logoutUser)

router.route('/refresh-token').post(refreshAccessToken)

router.route('/current-user').get(authMiddleware, getUserProfile)

router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({message: `welcome, user ${req.user.id}`})
})



export default router;