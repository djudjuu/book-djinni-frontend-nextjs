import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// hook to fetch books & categories from the backend
export const useBooks = () => {
  const { data, error } = useSWR(`/api/books`, fetcher);

  return {
    books: data?.data || [],
    isLoading: !error && !data,
    error: error,
  };
};

export const useBook = (id) => {
  if (!id) return { isLoading: false, error: false, book: null };
  // just to redeploy

  const { data, error } = useSWR(`/api/books/${id}`, fetcher, {
    refreshInterval: 5000,
  });
  // log data
  // console.log("in bookhook", data);

  return {
    book: data?.data || {},
    isLoading: !error && !data,
    error: error,
  };
};

export const useCategories = () => {
  const { data, error } = useSWR(`/api/categories`, fetcher, {
    refreshInterval: 5000,
  });

  const categoriesWithBooks = data?.data || [];

  return {
    categories: removeBooksFromCategories(categoriesWithBooks),
    categoriesLoading: !error && !data,
    categoriesError: error,
  };
};

export const useCategoriesWithBooks = () => {
  const { data, error } = useSWR(`/api/categories`, fetcher, {
    refreshInterval: 5000,
  });

  const categoriesWithBooks = data?.data || [];
  return {
    categories: getUniqueCategoryValues(categoriesWithBooks),
    categoriesLoading: !error && !data,
    categoriesError: error,
  };
};

export const removeBooksFromCategories = (categories) => {
  return categories
    .map((category) => {
      delete category.books;
      return category;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getUniqueCategoryValues = (categories) => {
  const categoryNames = [
    ...new Set(
      categories
        .filter((x) => x.books && x.books.length > 0)
        .map((item) => item.name)
    ),
  ];
  // for name in categoryNames ad all unique values for that name to categories object
  let categoriesObject = {};
  categoryNames.forEach((name) => {
    categoriesObject[name] = {
      name,
      values: categories
        .filter((item) => item.name === name)
        .map((item) => item.value),
    };
  });
  return categoriesObject;
};
