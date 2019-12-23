module.exports.relativeURL = function (rootURL, childURL) {
  const res = childURL.substr(endOfCommon,childURL.length);
  return res;
};

function endOfCommon(rootURL, childURL) {
  let iterNum = Math.min(rootURL.length, childURL.length);
  for (let i = 0; i < iterNum; i++) {
    if (rootURL.charAt(i) !== childURL.charAt(i)) {
      return i;
    }
  }
  return iterNum;
}
