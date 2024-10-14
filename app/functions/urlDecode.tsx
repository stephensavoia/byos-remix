export function urlDecode(recipeUrlCode: string) {
  const groupedIngredients: { [key: string]: number[] } = {};
  const keyMap: { [key: string]: string } = {
    L: "LIQ",
    F: "FRU",
    V: "VEG",
    G: "GRA",
    N: "NUT",
    S: "SUP",
  };

  let i = 0;
  while (i < recipeUrlCode.length) {
    const key = keyMap[recipeUrlCode[i]];
    i++;
    let value = "";
    while (i < recipeUrlCode.length && !isNaN(Number(recipeUrlCode[i]))) {
      value += recipeUrlCode[i];
      i++;
    }
    if (!groupedIngredients[key]) {
      groupedIngredients[key] = [];
    }
    groupedIngredients[key].push(Number(value));
  }

  return groupedIngredients;
}
