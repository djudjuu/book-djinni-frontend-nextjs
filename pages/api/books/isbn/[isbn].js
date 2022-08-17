export default async function handler(req, res) {
  // log "got request" to console
  console.log("got request");
  // make request to the openlib api to get the book data by isbn number
  const { isbn } = req.query;
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
  const response = await fetch(url);
  const data = await response.json();
  // check if the data object has a key with the isbn number
  if (data[`ISBN:${isbn}`]) {
    // if it does, return the data object that is under the isbn number
    res.status(200).json(data[`ISBN:${isbn}`]);
  } else {
    // if it doesn't, return an error message
    res.status(404).json({ message: "Book not found" });
  }
}
