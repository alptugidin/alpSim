type StandingHelper = (
  pos: number,
  classObject: any[]
) => any [];

const standingHelper: StandingHelper = (pos, arr) => {

  let finArr: any[] = [];
  if (pos < 5) {
    // 1, 2, 3, 4, 5, 6, 7, 8, 9, last
    finArr = [
      ...arr.slice(0, 8),
      arr.at(-1)
    ];
  } else if (pos >= 5 && pos <= 15) {
    // first 3, pos - 2, pos - 1, pos, pos + 1, pos + 2, last 3
    finArr = [
      ...arr.slice(0, 3),
      arr[pos - 2],
      arr[pos - 1],
      arr[pos],
      arr[pos + 1],
      arr[pos + 2],
      arr.at(-1)
    ];
  } else if (pos > 15 && pos < arr.length) {
    // first 3, pos - 2, pos - 1, pos, pos + 1, pos + 2, last 3
    finArr = [
      ...arr.slice(0, 3),
      arr[pos - 2],
      arr[pos - 1],
      arr[pos],
      arr[pos + 1] < arr.length ? arr[pos + 1] : -1,
      arr[pos + 2] < arr.length ? arr[pos + 2] : -1,
      arr.at(-1)
    ];
    if (arr.length - pos === 1) {
      finArr = [
        ...arr.slice(0, 3),
        arr[pos - 4],
        arr[pos - 3],
        arr[pos - 2],
        arr[pos - 1],
        arr[pos],
        arr[pos + 1],
      ];
    } else if (arr.length - pos === 2) {
      finArr = [
        ...arr.slice(0, 3),
        arr[pos - 3],
        arr[pos - 2],
        arr[pos - 1],
        arr[pos],
        arr[pos + 1],
        arr[pos + 2],
      ];
    } else if (arr.length - pos === 3) {
      finArr = [
        ...arr.slice(0, 3),
        arr[pos - 2],
        arr[pos - 1],
        arr[pos],
        arr[pos + 1],
        arr[pos + 2],
        arr[pos + 3],
      ];
    }
  } else if (pos === arr.length) {
    // first 3, pos - 2, pos - 1, pos, pos + 1, last 3
    finArr = [
      ...arr.slice(0, 3),
      arr[pos - 5],
      arr[pos - 4],
      arr[pos - 3],
      arr[pos - 2],
      arr[pos - 1],
      arr[pos]
    ];
  }
  const f = [...new Set(finArr)];
  // console.log(f);
  return f;
  // .filter(i => i !== '-1');
  // .map(i => i === pos.toString() ? Number(i) : i);

};

export default standingHelper;
