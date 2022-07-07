import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

const AddEdit = ({ book }) => {
  // log props to console
  console.log("book", book);
  const router = useRouter();
  const { id } = router.query;
  const isAddMode = !id;

  // yup validation schema for title and author and optional isbn
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    isbn: Yup.string(),
  });

  const defaultValues = isAddMode
    ? {}
    : { title: book.title, author: book.author, isbn: book.isbn };

  // useForm hook to handle form validation and data
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    validationSchema: schema,
    mode: "onChange",
    defaultValues: defaultValues,
    // {
    //   title: "title",
    //   author: "author",
    //   isbn: "",
    // },
  });

  // useEffect to reset form when isSubmitSuccessful is true
  useEffect(() => {
    console.log("form is", formState);
    if (isSubmitSuccessful) {
      console.log("isSubmitSuccessful here", isSubmitSuccessful);
      if (isAddMode) {
        reset(defaultValues);
      }
    }
  }, [isSubmitSuccessful, formState]);

  const onSubmit = async (data) => {
    if (isAddMode) addBook(data);
    else updateBook(data);
  };

  // async function to add a book by adding a book to the api
  const addBook = async (data) => {
    // send post request to api with axios putting title, author, and isbn in the body
    const res = await axios.post(`${baseUrl}/api/v1/books`, data);
    alert("Book added successfully");
  };

  // async function to update a book by adding a book to the api
  const updateBook = async (data) => {
    // send post request to api with axios putting title, author, and isbn in the body
    const res = await axios.put(`${baseUrl}/api/v1/books/${id}`, data);
    alert("Book updated successfully");
  };

  // return a form to enter author, title and isbn
  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <label>Title:</label>
      <input
        name="title"
        {...register("title", { required: true })}
        defaultValue={isAddMode ? "" : id}
        placeholder="Title"
        type="text"
        required
      />
      {errors?.title && <p>{errors.title.message}</p>}
      <label>Author:</label>
      <input
        name="author"
        {...register("author", { required: true })}
        defaultValue={isAddMode ? "" : id}
        placeholder="Author"
        type="text"
        required
      />
      {errors?.author && <p>{errors.author.message}</p>}
      <label>ISBN:</label>
      <input
        name="isbn"
        {...register("isbn", { required: false })}
        defaultValue={isAddMode ? "" : id}
        placeholder="ISBN (optional)"
        type="text"
      />
      {errors?.isbn && <p>{errors.isbn.message}</p>}
      <button type="submit"> {isAddMode ? "Add" : "Edit"}</button>
    </form>
  );

  //   return <div>addmode {isAddMode ? "yes" : "no"}</div>;
};

export default AddEdit;
