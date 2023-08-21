export const getDaysInMonth = (month: number, year: number) => {
  console.log(new Date(year, month, 0).getDate());
  return new Date(year, month, 0).getDate();
};
