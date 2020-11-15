const toFixedNoRounding = (num, decimals) => {
  const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + decimals + '})?', 'g');
  const a = num.toString().match(reg)[0];
  const dot = a.indexOf('.');
  if (dot === -1) {
    return a + '.' + '0'.repeat(decimals);
  }
  const b = decimals - (a.length - dot) + 1;
  return b > 0 ? a + '0'.repeat(b) : a;
};

export default toFixedNoRounding;
