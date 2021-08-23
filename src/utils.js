export function getRandomNumber(min, max) {
  const randomNumber = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(randomNumber);
}
export function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    const a = document.createElement("a")
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

export function getRandomArrayMember(array) {
  return array[getRandomNumber(0, array.length - 1)]
}
