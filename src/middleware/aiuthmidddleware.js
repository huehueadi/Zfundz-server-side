// import jwt from "jsonwebtoken";

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
    

//     // if (!token) {
//     //     return res.status(401).json({
//     //         message: "Unauthorized",
//     //         success: false
//     //     });
//     // }

//     jwt.verify(authHeader, 'athentication', (err, user) => {
//         if (err) {
//             return res.status(403).json({
//                 message: "Forbidden",
//                 success: false
//             });
//         }
//         req.user = user;
//         next();
//     });
// };

// export default authenticateToken


import jwt from 'jsonwebtoken';

// Middleware to verify JWT token from cookies
const authenticateToken = (req, res, next) => {
    // Extract the token from cookies or authorization header
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[0];;

    console.log('Token extracted:', token); // Log the extracted token

    if (!token) {
        console.log('No token provided'); // Log when no token is provided
        return res.status(401).json({
            message: "No token provided",
            success: false
        });
    }

    // Verify the token
    jwt.verify(token, 'athentication', (err, decoded) => { // Replace 'your-secret-key' with your actual secret key
        if (err) {
            console.log('Token verification failed:', err.message); // Log the error if token verification fails
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        // Attach user information to the request
        console.log('Decoded token:', decoded); // Log the decoded token data
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    });
};

export default authenticateToken;



