import { Fetcher } from "utils/fetcher";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;
// TODO add token & user info to headers
const backendFetcher = new Fetcher(null, `${baseUrl}/api/v1`);

export default async function handler(req, res) {
  //   if (req.method === 'POST') {
  if (req.method === "GET") {
    const { bookId } = req.query;
    const response = await backendFetcher.get(`/books/${bookId}`);
    console.log("response", response);
    res.status(200).json({ data: response });
  }
}
