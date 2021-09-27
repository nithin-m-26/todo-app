export function sortByProperty(property: string) {
  return function (a: any, b: any) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;
    return 0;
  };
}
