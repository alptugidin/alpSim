const intToHex = (int: number) => {
  // convert index color to hex color example 3395327 to 0x33CEFF
  const hex = int.toString(16);
  return `#${hex}`;
};

export default intToHex;
