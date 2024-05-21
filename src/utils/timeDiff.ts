// Usage: timeDiff(t1, t2);
interface TimeDiff {
    t1: string;
    t2: string;
    fixed?: number;
}
const timeDiff = ({t1, t2, fixed = 2}: TimeDiff): string => {
  if (t2 === t1) {
    return 'int';
  }

  const t1m = t1.split(':')[0];
  const t1s = t1.split(':')[1].split('.')[0];
  const t1ms = t1.split('.')[1];
  const t2m = t2.split(':')[0];
  const t2s = t2.split(':')[1].split('.')[0];
  const t2ms = t2.split('.')[1];
  const diff = (parseInt(t2m) - parseInt(t1m)) * 60 + parseInt(t2s) - parseInt(t1s) + (parseInt(t2ms) - parseInt(t1ms)) / 1000;
  return '+' + (diff * -1).toFixed(fixed);
};

export default timeDiff;
