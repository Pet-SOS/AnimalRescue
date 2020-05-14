
export const enumByValue = (value : any, e : any): any => {
    return Object.values(e).find(v => v === value);
};
