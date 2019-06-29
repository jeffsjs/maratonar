export const durationToMin = (duration) => {
  if (!duration) return 0;
  const h = duration.search('h') > 0 ? parseInt(duration.split("h")[0]) : 0;
  const getMin = duration.match("(\\d{2})min");
  const m = getMin ? parseInt(getMin[1]) : 0;
  return (h * 60) + m;
};