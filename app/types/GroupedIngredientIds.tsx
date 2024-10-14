export type GroupedIngredientIds = {
  LIQ?: number[];
  FRU?: number[];
  VEG?: number[];
  GRA?: number[];
  NUT?: number[];
  SUP?: number[];
  [key: string]: number[] | undefined;
};
