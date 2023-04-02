export const getTypes = () => {
    const data = localStorage.getItem('careType');

    // @ts-ignore
    const cats = JSON.parse(data).map(item => item.careType);

    if (!data) localStorage.setItem("careType", cats)

    return data ? (JSON.parse(data).length ? JSON.parse(data) : cats) : cats
};
