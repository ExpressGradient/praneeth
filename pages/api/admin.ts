import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.redirect("https://www.youtube.com/watch?v=xvFZjo5PgG0&autoplay=1");
}
