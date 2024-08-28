import express from "express";
import {
    createUser,
    getProfile,
    loginUser
} from "../controllers/authController.js";
import {
    loginValidator,
} from "../helper/validator.js";


const router = express.Router();

router.post("/message",createUser);
router.post("/login",loginValidator,loginUser);
router.get("/getprofile",getProfile)



export default router;



