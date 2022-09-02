export const getValidDate = (date) => {
  return date === "" ? new Date() : new Date(date);
};
