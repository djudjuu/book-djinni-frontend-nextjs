const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p> by {book.author}</p>
      {/* <p>isbn: {book.isbn}</p> */}
    </div>
  );
};

export default BookCard;
