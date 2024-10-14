export type Ingredient = {
  IngredientID: number;
  IngredientName: string;
  Category: string;
  VitaminA: number;
  VitaminC: number;
  Calcium: number;
  Iron: number;
  Potassium: number;
  Benefits: string;
  Quantity?: number;
};

export type IngredientsData = {
  [key: string]: Ingredient[];
};
