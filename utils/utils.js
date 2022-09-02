export const getValidDate = (date) => {
  return date === ""
    ? new Date(Date.now()).toDateString()
    : new Date(date).toDateString();
};
