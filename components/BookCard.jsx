const BookCard = ({ book }) => {
  const title = book.title.replace(/\s/g, "+");
  const author = book.author.replace(/\s/g, "+");
  const libgenlink = `https://libgen.is/search.php?req=${title}+${author}`;
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p> by {book.author}</p>
      {/* <p>isbn: {book.isbn}</p> */}
      <a href={libgenlink} target="_blank">
        <button>View on Libgen</button>
      </a>
    </div>
  );
};

export default BookCard;
