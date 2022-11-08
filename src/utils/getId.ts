export const getId = (url: string | undefined) => {
  const id = url?.substring(34, 36);
  console.log(id);
  // @ts-ignore
  return parseInt(id);
};
