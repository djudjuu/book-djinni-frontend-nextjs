import { Fetcher } from "utils/fetcher";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/v1`;
// TODO add token & user info to headers
const backendFetcher = new Fetcher(null, baseUrl);

export default async function handler(req, res) {
  //   if (req.method === 'POST') {
  if (req.method === "GET") {
    console.log(req.url, req.body);
    const response = await backendFetcher.get(`/categories`);
    console.log("response", response);
    res.status(200).json({ data: response });
  }
}
