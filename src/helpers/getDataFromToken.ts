import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function getDataFromToken(request: NextRequest) {
  const token = request.cookies.get('token')?.value || '';
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
