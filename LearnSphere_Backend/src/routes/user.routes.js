import {Router} from 'express';
import { registerUser, loginUser, refreshAccessToken, getUserProfile, logoutUser } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.route('/register').post(registerUser)

userRouter.route('/login').post(loginUser)

userRouter.route('/logout').post(authMiddleware, logoutUser)

userRouter.route('/refresh-token').post(refreshAccessToken)

userRouter.route('/current-user').get(authMiddleware, getUserProfile)

userRouter.get('/dashboard', authMiddleware, (req, res) => {
    res.json({message: `welcome, user ${req.user.id}`})
})



export default userRouter;