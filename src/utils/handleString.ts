export const substrAddress = (str: string, before: number, after = before) => {
  return str
    ? str.substring(0, before) + "..." + str.substring(str.length - after)
    : "";
};
