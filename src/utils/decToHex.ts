const  intToHex = (n: number) => {
  let hex = n.toString(16);
  while (hex.length < 6) {
    hex = '0' + hex;
  }
  return '#' + hex;
};

export default intToHex;
