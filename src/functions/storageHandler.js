export const getItem = (itemName) => {
    return localStorage.getItem(itemName);
}

export const setItem = (itemName, value) => {
    localStorage.setItem(itemName, value);
}

export const getItemJSON = itemName => {
    return JSON.parse(localStorage.getItem(itemName));
}