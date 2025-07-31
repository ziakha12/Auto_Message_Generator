import { Router } from "express";
import { changePassword, createUser, getCurrentUser, loginUser, logoutUser, updateUserDetails } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router()

router.route('/create').post(createUser)
router.route('/login').post(loginUser)
// protected routes
router.route('/logout').post(verifyJwt, logoutUser)
router.route('/update-details').put(verifyJwt, updateUserDetails)
router.route('/change-password').put(verifyJwt, changePassword)
router.route('/current-user').get(verifyJwt, getCurrentUser)

export default router