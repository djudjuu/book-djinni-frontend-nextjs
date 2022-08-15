import { Fetcher } from "utils/fetcher";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;
// TODO add token & user info to headers
const backendFetcher = new Fetcher(null, `${baseUrl}/api/v1`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await backendFetcher.post(`/books`, req.body);
    res.status(200).json({ data: response });
  }

  if (req.method === "GET") {
    const response = await backendFetcher.get(`/books`);
    res.status(200).json({ data: response });
  }
}
