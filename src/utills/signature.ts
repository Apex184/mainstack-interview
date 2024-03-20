import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../DTO/Auth.dto';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateSignature = async (payload: AuthPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

export const validateSignature = async (req: Request, res: Response) => {
  const signature = req.get('Authorization')?.replace('Bearer ', '');

  if (!signature) {
    return false;
  }

  try {
    const payload = jwt.verify(signature, JWT_SECRET);
    res.locals.user = payload;

    return true;
  } catch (error) {
    return false;
  }
};
