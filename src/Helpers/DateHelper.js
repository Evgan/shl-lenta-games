// 7.12.2019 => 2019-12-07T24:59:59
export const reFormatDate = (date) => {
    const arr = date.split('.');
    if (arr.length !== 3) {
        return date;
    }
    if (arr[0].length === 1) {
        arr[0] = `0${arr[0]}`
    }
    return `${arr.reverse().join('-')}T23:59:59.000Z`;
};