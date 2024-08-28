import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import jwt from "jsonwebtoken";
import User from '../models/register.js';
import Role from '../models/roles.js';

export const createUser = async (req, res) => {
    try {
        const { fullName, email, mobile, password, role } = req.body;
     
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            mobile,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// first step email check 
// second step passwrod comapre 
// jwt tohen 
// email error 
// password error 
// login succesfully 

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation errors",
                errors: errors.array()
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid Email",
                success: false,
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid Password",
                success: false,
            });
        }

        const roles = await Role.find({ _id: { $in: user.role } })
            .populate({
                path: 'permissions.permissionId',
                select: 'permissionName',
            })
            .populate({
                path: 'permissions.actionIds',
                select: 'actionName',
            });

        const payload = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: roles.map(role => ({
                roleName: role.roleName,
                permissions: role.permissions.map(permission => ({
                    permissionName: permission.permissionId.permissionName,
                    actionIds: permission.actionIds.map(action => action._id.toString())
                }))
            })),
            kyc_status: user.kyc_status,
            mobile: user.mobile,
            about: user.about,
            country: user.country,
            address:user.address,
            created_at: user.created_at,
            updated_at: user.updated_at
        };

        const token = jwt.sign(payload, 'athentication', { expiresIn: '5h' });

        res.cookie('token', token, {
           
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour
        });

        return res.status(200).json({
            message: "User login successful",
            success: true,
            token,
            tokenType: 'Bearer',
            data: payload
        });

    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
export const getProfile = async (req, res) => {
    console.log(req.user)
    try {
        const user = await User.findById(req.user.id); // req.user.id is set by the auth middleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user );
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

