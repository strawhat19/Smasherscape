export const generateID2 = () => {
  let id = Math.random().toString(36).substr(2, 9);
  return Array.from(id).map(char => {
    return Math.random() > 0.5 ? char.toUpperCase() : char;
  }).join(``);
}

export const generateUniqueID2 = (existingIDs?: string[]) => {
  let newID = generateID2();
  if (existingIDs && existingIDs.length > 0) {
    while (existingIDs.includes(newID)) {
      newID = generateID2();
    }
  }
  return newID;
}

export const removeTrailingZeroDecimal2 = (number, decimalPlaces = 1) => {
  let num = typeof number == `string` ? parseFloat(number) : number;
  const wholeNumber = Math.trunc(num);
  const decimalPart = num - wholeNumber;
  if (decimalPart === 0) {
    return wholeNumber;
  } else {
    return num.toFixed(decimalPlaces);
  }
}