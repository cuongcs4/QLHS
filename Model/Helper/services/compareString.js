const compareString = (string1, string2) => {
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();

  //string1 = string2 = "a";
  const arrString1 = string1.split(" ");
  const arrString2 = string2.split(" ");

  if (arrString1.length !== arrString2.length) return false;

  for (let i = 0; i < arrString1.length; i++) {
    if (arrString1[i] != arrString2[i]) return false;
  }

  return true;
};

module.exports = compareString;
