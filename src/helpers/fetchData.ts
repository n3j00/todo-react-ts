export const fetchData = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
};
