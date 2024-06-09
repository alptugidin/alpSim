const intToHex = (int: number) => {
  const hex = int.toString(16);
  return `#${hex}`;
};

export default intToHex;
