export const getItem = (itemName) => {
    return localStorage.getItem(itemName);
}

export const setItem = (itemName, value) => {
    localStorage.setItem(itemName, value);
}