export const numToAutoFixed = (num) => {
    return num.toFixed(2).replace(/\.00$/, "");
};
