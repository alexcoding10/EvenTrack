import { Request, Response } from 'express';
import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY || 'FD6EB343E8AE9DF5DF4AA1416B76E';

export const qrgenerate = async (req: Request, res: Response): Promise<void> => {
  const { data, expiresIn } = req.body; // Changed to req.body to access POST data

  // Check if data is provided
  if (!data) {
    res.status(400).json({ error: "Data parameter is required" });
    return;
  }

  // Check if JWT_KEY is defined
  if (!JWT_KEY) {
    res.status(500).json({ error: "JWT secret key is missing" });
    return;
  }

  try {
    // Set default expiration if `expiresIn` isn't provided
    const token = jwt.sign({ data: data }, JWT_KEY, { expiresIn: expiresIn || "1h" });
    
    // Generate QR code from the JWT token
    const qrCode = await QRCode.toDataURL(token);
    
    // Respond with the generated QR code
    res.json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};


export const qrverify = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ error: 'Token parameter is required', valid: false });
    return
  }

  try {
    // Verify the JWT token
    jwt.verify(token, JWT_KEY);
    res.json({ data: jwt.decode ,valid: true });
    return
  } catch (error) {
    res.status(401).json({ error: 'Invalid token', valid: false });
    return
  }
};
