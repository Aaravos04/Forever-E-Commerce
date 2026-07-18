import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if(!token)
            return res.status(401).json({ success: false, message: "Access denied! Unauthorized user!" });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
            return res.status(401).json({ success: false, message: "Access denied! Invalid token!" });

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default adminAuth;