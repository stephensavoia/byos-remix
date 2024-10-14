import { GroupedIngredients } from "~/types/GroupedIngredients";

export function urlEncode(
  groupedIngredients: GroupedIngredients,
  smoothieName: string
) {
  let cleanSmoothieName = smoothieName
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/ /g, "+");

  let recipeUrlCode = "";
  for (const [key, values] of Object.entries(groupedIngredients)) {
    for (const value of values) {
      recipeUrlCode += `${key[0]}${value}`;
    }
  }

  let returnedUrlCode = `/recipe/${recipeUrlCode}?t=${cleanSmoothieName}`;

  return returnedUrlCode;
}
