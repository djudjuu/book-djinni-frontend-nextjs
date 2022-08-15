import { Fetcher } from "utils/fetcher";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;
// TODO add token & user info to headers
const backendFetcher = new Fetcher(null, `${baseUrl}/api/v1`);

export default async function handler(req, res) {
  const { bookId } = req.query;
  if (req.method === "PUT") {
    // modify book
    console.log("req.body", req.body);
    const response = await backendFetcher.update(`/books/${bookId}`, req.body);
    res.status(200).json({ data: response });
  }

  if (req.method === "GET") {
    const response = await backendFetcher.get(`/books/${bookId}`);
    res.status(200).json({ data: response });
  }

  if (req.method === "DELETE") {
    // delete book
    console.log("req.body", req.body);
    const response = await backendFetcher.remove(`/books/${bookId}`);
    res.status(200).json({ data: response });
  }
}
