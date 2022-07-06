import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const AddEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const isAddMode = !id;

  // yup validation schema for title and author and optional isbn
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    isbn: Yup.string(),
  });

  // useForm hook to handle form validation and data
  const { register, handleSubmit, errors, setValue } = useForm({
    validationSchema: schema,
    mode: "onChange",
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
    },
  });

  const onSubmit = (data) => {
    console.log("haaa", data);
  };

  // return a form to enter author, title and isbn

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        placeholder="ISBN"
        type="text"
      />
      {errors?.isbn && <p>{errors.isbn.message}</p>}
      <button type="submit">Save</button>
    </form>
  );

  //   return <div>addmode {isAddMode ? "yes" : "no"}</div>;
};

export default AddEdit;
