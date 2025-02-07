function uniqueArray(arr) {
  return arr.filter((e, i, self) => i === self.indexOf(e));
}

export { uniqueArray };
