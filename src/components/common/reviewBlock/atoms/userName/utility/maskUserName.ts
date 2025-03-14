export const maskUserName = (name: string = '') => {
  if (name.length <= 3) return name;

  return name.slice(0, 3) + '*'.repeat(name.length - 3);
};
