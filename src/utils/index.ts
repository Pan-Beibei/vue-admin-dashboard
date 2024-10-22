export const getImageUrl = (user: string) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};

export const timeFormat = (timeStr: string) => {
  const time = new Date(timeStr);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  function add(m: number) {
    return m < 10 ? "0" + m : m;
  }
  return year + "-" + add(month) + "-" + add(date);
};
