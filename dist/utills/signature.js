import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const generateSignature = async (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};
export const validateSignature = async (req, res) => {
    const signature = req.get('Authorization')?.replace('Bearer ', '');
    if (!signature) {
        return false;
    }
    try {
        const payload = jwt.verify(signature, JWT_SECRET);
        res.locals.user = payload;
        return true;
    }
    catch (error) {
        return false;
    }
};
//# sourceMappingURL=signature.js.map