
const adminMiddleware = async (req, res, next) => {
    console.log(req.user)

    try {
        const user = req.user.role; 

        if (user !== "SuperAdmin") {
            return res.status(403).json({
                message: "You are not authorized for this route",
                success: false
            });
        }

        next();
    } catch (error) {
        console.error('Error in adminMiddleware:', error);

        res.status(500).json({
            error: "Error while accessing the route"
        });
    }
};

export default adminMiddleware;
