+-----------+          +-------------+          +-------------+
|   User    |          |  Franchise  |          |  Investment |
+-----------+          +-------------+          +-------------+
| id        |<-------->| id          |          | id          |
| username  |          | name        |          | user_id     |<--------+
| password  |          | description |          | franchise_id|         |
| email     |          | investment_ |          | amount_     |         |
| full_name |          | required    |          | invested    |         |
| date_of_  |          | category_id |<---------| status      |         |
| birth     |          | created_at  |          | created_at  |         |
| kyc_status|          | updated_at  |          | updated_at  |         |
| role      |          +-------------+          +-------------+         |
| created_at|                                                           |
| updated_at|                                                           |
+-----------+                                                           |
     |                                                                  |
     |                                                                  |
     v                                                                  |
+-----------+                                                           |
| KYC Docs  |                                                           |
+-----------+                                                           |
| id        |                                                           |
| user_id   |<----------------------------------------------------------+
| doc_type  |
| doc_url   |
| status    |
|uploaded_at|
+-----------+

+-----------+          +-------------+          +----------------+
|   Admin   |          |  Audit Logs |          | Notifications  |
+-----------+          +-------------+          +----------------+
| id        |          | id          |          | id             |
| username  |          | user_id     |<-------->| user_id        |
| password  |          | action      |          | message        |
| email     |          | timestamp   |          | is_read        |
| full_name |          | details     |          | created_at     |
| role      |          +-------------+          +----------------+
| created_at|                                   
| updated_at|
+-----------+


+-----------+          +--------------------+
|  Roles    |          | Permissions        |
+-----------+          +--------------------+
| id        |          | id                 |
| role_name |          | name               |
|permissions|          | description        |
+-----------+          | created_at         |
                       | updated_at         |
                       +--------------------+


+-----------+          
| Category  |          
+-----------+          
| id        |          
| name      |          
| created_at|        
| updated_at|        
+-----------+

+-----------+          +------------------+
| User CRUD |          | FranchiseCategory|
+-----------+          +------------------+
| id        |          | franchise_id     |
| admin_id  |          | category_id      |
| user_id   |          +------------------+
| action    |
| timestamp |
+-----------+

1. Create schemas according to this digram and tell me how many schema is created for this model 
2. Admin routes need to access by only the admin and and it is acheive by the role of the user, if role of the user is admin or sub admin then it will access by the admin. 
3. Admin and user routes needs validator and we use express validator 

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

        console.log('Request body:', req.body);

      
        const user = await User.findOne({ email })
        .populate({
            path: 'role',
            populate: {
                path: 'permissions.permissionId',
                select: 'permissionName'
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email",
                success: false,
            });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid Password",
                success: false,
            });
        }

       
        let responseData = {
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        if (user.role.some(role => role.roleName !== 'SuperAdmin')) {
            responseData = {
                ...responseData,
                kyc_status: user.kyc_status,
                mobile: user.mobile,
            };
        }

        
        const token = jwt.sign({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role.map(role => ({
                roleName: role.roleName,
                permissions: role.permissions.map(permission => ({
                    permissionName: permission.permissionId.permissionName,
                    actionIds: permission.actionIds //
                }))
            })),
            kyc_status: user.kyc_status,
            mobile: user.mobile,
            created_at: user.created_at,
            updated_at: user.updated_at
    
        }, process.env.JWT_SECRET || 'athentication', { expiresIn: '1h' });

      
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000, 
        });

      
        return res.status(200).json({
            message: "User login successful",
            success: true,
            token,
            tokenType: 'Bearer',
            data: token 
        });

    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};