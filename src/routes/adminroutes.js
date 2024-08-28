import express from "express";
import { addAction, viewAction } from "../controllers/admin/AuthActionController.js";
import { createBlog, deleteBlog, singleViewBlog, updateBlog, viewBlog } from "../controllers/admin/AuthBlogController.js";
import { createTransaction, getTransactionDetails, verifyPayment } from "../controllers/admin/AuthPaymentController.js";
import { propertyListings, register } from "../controllers/admin/AuthPropertyController.js";
import { getPortfolio } from "../controllers/admin/PortfolioController.js";
import { addProperty, deleteProperty, updateProperty, viewAllProperty, viewProperty } from "../controllers/admin/PropertyController.js";
import {
    addRole, addUser, deletRole, deleteUser, getAllUsers, getUsers, updateUsers, viewRoles
} from "../controllers/admin/authAdminController.js";
import { addPermission, viewPermission } from "../controllers/admin/authAdminPermission.js";
import { purchaseTicket } from "../controllers/admin/authTicketPurchase.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../controllers/admin/paymentController.js";
import authenticateToken from "../middleware/aiuthmidddleware.js";

const router = express.Router();
//User
router.delete("/delete-user/:userId",deleteUser)
router.put("/update-user/:userId",updateUsers)
router.post("/add-user",addUser)
router.get("/profile",authenticateToken,getUsers)
router.get("/all-users",getAllUsers)


//Roles
router.post("/add-role",addRole)
router.get("/view-role",viewRoles)
router.delete("/delete-role/:roleId",deletRole)

// Permission 
router.post("/add-permission", addPermission)
router.get("/view-permission", viewPermission)

// Action
router.post("/add-action",addAction)
router.get("/view-action",viewAction)
router.get("/view-action",viewAction)       

// Property
router.post("/add-property", addProperty)     
router.get("/viewAll-property",viewAllProperty)    
router.put("/update-property/:propertyId",updateProperty)   
router.delete("/delete-property/:propertyId",deleteProperty)
router.get("/view-property/:propertyId",viewProperty) 

// updated property controller

router.post("/new-property", register)
router.get("/all-properties", propertyListings)

// TIckets 

router.post("/buy-tickets",purchaseTicket)


//Payment

router.post("/razorpay/order", createRazorpayOrder )
router.post("/razorpay/verify", verifyRazorpayPayment )

//Update payement  Routes

router.post("/create-payment",createTransaction )
router.post("/verify-payement", verifyPayment)
router.get("/details", authenticateToken, getTransactionDetails)

// Portfolio 

router.get('/portfolio', authenticateToken, getPortfolio)


//Blog

router.post('/write-blog', createBlog)
router.delete('/delete-blog/:id', deleteBlog)
router.put('/update-blog/:id', updateBlog)
router.get('/view-all-blog',viewBlog)
router.get('/view-blog/:id',singleViewBlog) 



export default router;
