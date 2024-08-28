import Permission from '../models/permission.js';
import User from '../models/register.js';
const authorize = (requiredPermission, requiredAction) => {
    return async (req, res, next) => {
        const userId = req.user.id
        try {
            const user = await User.findById(userId).populate({
                path: 'roles',
                populate: {
                    path: 'permissions',
                    populate: {
                        path: 'actions'
                    }
                }
            });

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const hasPermission = user.roles.some(role => 
                role.permissions.some(permission => 
                    permission.permissionName === requiredPermission &&
                    permission.actions.some(action => action.actionName === requiredAction)
                )
            );

            if (!hasPermission) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    };
};

export default authorize

