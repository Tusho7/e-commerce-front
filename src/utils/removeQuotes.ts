export const removeQuotes = (str: string | undefined) => {
  if (!str) return "";
  return str.replace(/"/g, "");
};
