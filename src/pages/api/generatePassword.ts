import type { NextApiRequest, NextApiResponse } from 'next';
import { generatePassword } from "@/lib/passwordGenerator";

import type { GeneratePasswordRequest, GeneratePasswordResponse } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, length, numbers, symbols } = req.body as GeneratePasswordRequest;
  let password  = generatePassword(type, length, numbers, symbols);

  res.status(200).json({ password } as GeneratePasswordResponse);
}
