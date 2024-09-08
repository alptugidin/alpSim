const timeConvert = (seconds: number, hideMs = false) => {
  if (seconds === -1 || seconds === 0 || !seconds) return '--';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = Math.floor(seconds % 60);
  const secStr = sec < 10 ? '0' + sec : sec;
  const milisec = seconds.toString().split('.')[1]?.slice(0, 3) ?? '000';
  return `${hours > 0 ? hours + ':' : ''}${minutes > 0 ? minutes + ':' : '0:'}${secStr}${hideMs ? '' : '.' + milisec}`;
};

export default timeConvert;
