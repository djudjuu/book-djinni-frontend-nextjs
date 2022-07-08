import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

const AddEdit = ({ book, categories }) => {
  // log props to console
  const router = useRouter();
  const { id } = router.query;
  const isAddMode = !id;

  // yup validation schema for title and author and optional isbn
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    isbn: Yup.string(),
    categories: Yup.array(),
  });

  const defaultValues = isAddMode
    ? { categories: [] }
    : {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        categories: book.categories.map((c) => c.id),
      };

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
  });

  // useEffect to reset form when isSubmitSuccessful is true
  useEffect(() => {
    if (isSubmitSuccessful) {
      if (isAddMode) {
        reset(defaultValues);
        // redirect to /book?id=${res.data.id}
        // redirect to /book
        // router.push(`/book?id=${res.data.id}`);
      }
      router.push("/book");
    }
  }, [isSubmitSuccessful, formState]);

  const onSubmit = async (data) => {
    // log data to console
    // console.log("data", JSON.stringify(data));
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
    <div>
      <h1>{isAddMode ? "Add a new book" : "Edit book"}</h1>
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
        <br />
        <label>ISBN:</label>
        <input
          name="isbn"
          {...register("isbn", { required: false })}
          defaultValue={isAddMode ? "" : id}
          placeholder="ISBN (optional)"
          type="text"
        />
        {errors?.isbn && <p>{errors.isbn.message}</p>}
        <br />
        <label>Categories:</label>
        {/* // map over categories creating a checkbox for each category, displaying
      // the category name and value. //when a checkbox is clicked the id of the
      category should be added or removed from the form data */}
        {categories
          // .sort((a, b) => a.name > b.name)
          .map((category) => (
            <div key={category.id}>
              <input
                name="categories"
                {...register("categories", { required: true })}
                type="checkbox"
                value={category.id}
                defaultChecked={
                  isAddMode
                    ? false
                    : book.categories.some((c) => c.id === category.id)
                }
              />
              {/* <span> {category.name}: {category.value} </span> */}
              <span> {category.value} </span>
            </div>
          ))}
        {/* // {errors?.categories && <p>{errors.categories.message}</p>} */}
        <button type="submit"> {isAddMode ? "Add" : "Edit"}</button>
      </form>
    </div>
  );

  //   return <div>addmode {isAddMode ? "yes" : "no"}</div>;
};

export default AddEdit;
