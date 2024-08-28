import bcrypt from "bcrypt";
import Action from "../../models/action.js";
import Permission from "../../models/permission.js";
import User from "../../models/register.js";
import { default as Role, default as roles } from "../../models/roles.js";

export const newUser =  async (req, res) => {
    const { fullName, email, mobile, password, role } = req.body;

    try {
        const newUser = new User({
            fullName,
            email,
            mobile,
            password, 
            role
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
};

export const deleteUser = async (req, res) => {
    try {

        const userId = req.params.userId;
        const user = await User.findByIdAndDelete(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

export const addUser = async (req, res) => {
    const { fullName, email, mobile, password, role, about, address, country } = req.body;

    try {
        console.log('Request Body:', req.body); // Log the request body

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        const foundRole = await Role.findById(role);
        console.log('Found Role:', foundRole); // Log the result of the role query

        

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await new User({
           
            fullName,
            email,
            mobile,            
            password: hashedPassword,
            role: foundRole._id,
           
            address,
            country,
            about

        });

        await newUser.save();

        return res.status(201).json({ message: "User added successfully", success: true });
    } catch (error) {
        console.error("Error adding user:", error);
        return res.status(500).json({ message: "Failed to add user", success: false });
    }
};


export const updateUsers = async( req, res)=>{
    const userId = req.params.userId
    const userData = req.body
     try {
        if(!userData){
            res.status(401).json({
                message:"You are not authorized",
                success: false
            })
        }
        const user = await User.findByIdAndUpdate(userId, userData);
        if(!user){
            res.status(401).json({
                message:"User not found",
                sucess:false
            })
        }
        res.status(201).json({
            message:"User updated Successfully",
            success:true,
            user
        })
     } catch (error) {
        res.status(404).json({
            message:"Internal Server error",
            error:error,
            success:false
        })
        
     }
}

export const getUsers = async (req, res) => {
 // Assuming the id is passed as a route parameter

    try {
        const user = await User.findById(req.user._id).populate('role'); 
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role'); // Populate the 'role' field if referenced
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

// roles

export const addRole = async (req, res) => {
    const { roleName, permissions } = req.body;
  
   
    if (!roleName || !permissions || !Array.isArray(permissions) || permissions.length === 0) {
      return res.status(400).json({ error: 'Role name and a non-empty array of permissions are required.' });
    }
  
    try {
    
      for (const perm of permissions) {
        const { permissionId, actionIds } = perm;
  
        const permission = await Permission.findById(permissionId);
        if (!permission) {
          return res.status(400).json({ error: `Permission with ID ${permissionId} not found.` });
        }
  
        for (const actionId of actionIds) {
          const action = await Action.findById(actionId);
          if (!action) {
            return res.status(400).json({ error: `Action with ID ${actionId} not found.` });
          }
        }
      }
  
      // Create a new role
      const newRole = new Role({
        roleName,
        permissions: permissions.map(({ permissionId, actionIds }) => ({
          permissionId,
          actionIds,
        })),
      });
  
      // Save the role to the database
      const savedRole = await newRole.save();
      res.status(201).json(savedRole);
    } catch (error) {
      console.error('Error adding role:', error);
      res.status(500).json({ error: 'An error occurred while adding the role. Please try again later.' });
    }
  };
  
export const deletRole = async(req, res)=>{
  try {
    const roleId = req.params.roleId

    const role = await roles.findByIdAndDelete(roleId)

    if(!role){
        res.status(401).json({
            message:"Role not found",
            success:false
        })
    }
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error adding role:', error);
    res.status(500).json({ message: 'Internal Server Error' });
}

}

export const viewRoles = async (req, res) => {
    try {
        const roles = await Role.find()
            .populate({
                path: 'permissions.permissionId',
                select: 'permissionName',
            })
            .populate({
                path: 'permissions.actionIds',
                select: 'actionName',
            });

        res.json(roles);
    } catch (err) {
        console.error('Error fetching roles:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};