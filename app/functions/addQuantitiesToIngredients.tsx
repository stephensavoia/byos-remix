import { IngredientsData } from "~/types/IngredientsData";

export function addQuantitiesToIngredients(ingredientsData: IngredientsData) {
  // "Units" out of 4. So 4 --> 1 cups/tbsp, 8 --> 2 cups/tbsp, 1 --> 0.25 cups/tbsp, etc.
  const quantityKey: { [key in keyof typeof ingredientsData]: number } = {
    LIQ: 4,
    FRU: 8,
    VEG: 4,
    GRA: 1,
    NUT: 8,
    SUP: 16,
  };
  for (const [category, ingredients] of Object.entries(ingredientsData)) {
    const quantity = Number(
      quantityKey[category as keyof typeof quantityKey] / ingredients.length
    );
    ingredients.forEach((ingredient) => {
      ingredient.Quantity = quantity;
    });
  }
}
