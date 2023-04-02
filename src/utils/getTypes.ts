import categories from "../utils/categories.json";

export const getTypes = () => {
    const data = localStorage.getItem('types');

    if (!data) localStorage.setItem("types", JSON.stringify(categories))

    return data ? (JSON.parse(data).length ? JSON.parse(data) : categories) : categories
};
