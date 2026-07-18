import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.status(401).json({success: false, message: 'Access denied! No token provided.'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: 'Access denied! Invalid token.'});
    }
}

export default authUser;