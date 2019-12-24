module.exports.relativeURL = function (rootURL, childURL) {
  return childURL.substr(endOfCommon(rootURL, childURL), childURL.length);
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
