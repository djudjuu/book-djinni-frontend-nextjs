import { Fetcher } from "utils/fetcher";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;
// TODO add token & user info to headers
const backendFetcher = new Fetcher(null, `${baseUrl}/api/v1`);

export default async function handler(req, res) {
  //   if (req.method === 'POST') {
  if (req.method === "GET") {
    console.log(req.url, req.body);
    const response = await backendFetcher.get(`/books`);
    console.log("response", response);
    res.status(200).json({ data: response });
  }
}
