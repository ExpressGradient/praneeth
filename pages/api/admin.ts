import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
}
