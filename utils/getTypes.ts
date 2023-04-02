import cats from "./cats.json"

export const getTypes = () => {
    const data = localStorage.getItem('types');

    if (!data) localStorage.setItem("types", JSON.stringify(cats))

    return data ? (JSON.parse(data).length ? JSON.parse(data) : cats) : cats
};
