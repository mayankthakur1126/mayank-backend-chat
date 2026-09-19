import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token =  req.headers['authorization'];
        console.log("token", token)
        if (!token) return res.status(403).send("Access denied.");
        const tokenWithoutBearer = token.split(' ')[1];

        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        console.log("decoded", decoded)
        req.user = decoded;
        next();
    } catch (error) {
        console.log("error",error)
        res.status(400).send("Invalid tokenWithoutBearer");
    }
};

export default auth;