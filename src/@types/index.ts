import { Request } from 'express';

export interface RequestAlt extends Request {
  user: {
    _id: string;
    name: string;
    email: string;
    address: string | null;
    dob: string | null;
    phone: string | null;
    gender: string | null;
    imageUrl: string | null;
    password: string;
    isActive: boolean;
    role: string
  }
}