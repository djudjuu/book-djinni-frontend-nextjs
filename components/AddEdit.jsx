import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useBook } from "utils/hooks";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/v1`;

const AddEdit = ({ bookId, categories }) => {
  const router = useRouter();
  const isAddMode = !bookId;

  const { book, isLoading, error } = useBook(bookId);
  const { mutate } = useSWRConfig();
  // yup validation schema for title and author and optional isbn
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    isbn: Yup.string(),
    // require categories as an array of lenght > 0
    categories: Yup.array(), //.min(1, "At least one category is required"),
  });

  const defaultValues = isAddMode
    ? { categories: [] }
    : {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        categories: book.categories, //?.map((c) => c.id) || [],
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
    if (isAddMode) addBook(data);
    else updateBook(data);
  };

  // async function to add a book by adding a book to the api
  const addBook = async (data) => {
    await axios.post(`/api/books`, data);
    mutate("/api/books");
  };

  // async function to update a book by adding a book to the api
  const updateBook = async (data) => {
    const updateFn = () => axios.put(`/api/books/${bookId}`, data);

    const updatedBook = {
      ...book,
      categories: data.categories,
      title: data.title,
      author: data.author,
      isbn: data.isbn,
    };

    mutate(`/api/books/${bookId}`, updateFn, { optimisticData: updatedBook });
    // mutate(`/api/books`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <h1>{isAddMode ? "Add a new book" : "Edit book"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <label>Title:</label>
        <input
          name="title"
          {...register("title", { required: true })}
          defaultValue={isAddMode ? "" : book.title}
          placeholder="Title"
          type="text"
          required
        />
        {errors?.title && <p>{errors.title.message}</p>}
        <label>Author:</label>
        <input
          name="author"
          {...register("author", { required: true })}
          defaultValue={isAddMode ? "" : book.author}
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
          defaultValue={isAddMode ? "" : book.isbn}
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
                {...register("categories", { required: false })}
                type="checkbox"
                value={category.id}
                defaultChecked={
                  isAddMode
                    ? false
                    : book.categories?.some((c) => c.id === category.id) ||
                      false
                }
              />
              {/* <span> {category.name}: {category.value} </span> */}
              <span> {category.value} </span>
            </div>
          ))}
        {errors?.categories && <p>{errors.categories.message}</p>}
        <button type="submit"> {isAddMode ? "Add" : "Edit"}</button>
      </form>
    </div>
  );
};

export default AddEdit;
