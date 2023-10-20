import { API_URL } from "./config";

export const state = {
  product: {},
  search: {
    query: "",
    results: [],
  },
};
export const loadSearchResults = async function (query) {
  //search the database for query
  try {
    state.search.query = query;
    const res = await fetch(`${API_URL}/all?q=${query}`);
    const data = await res.json();

    state.search.results = data;
  } catch (err) {
    console.error(err);
  }
  //store the returned output into search.results[]
};

export const loadProductDetails = async function (id, category) {
  try {
    const res = await fetch(`${API_URL}/${category}/${id}`);
    const data = await res.json();

    state.product = data;
  } catch (err) {
    console.error(err);
  }
};
