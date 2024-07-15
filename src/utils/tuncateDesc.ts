export const truncateDescription = (str: string | undefined) => {
  if (!str) return "";
  if (str.length > 15) {
    return str.substring(0, 15) + "...";
  }
  return str;
};
