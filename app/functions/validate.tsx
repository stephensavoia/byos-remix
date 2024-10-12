import { GroupedIngredients } from "~/types/GroupedIngredients";

export async function validate(groupedIngredients: GroupedIngredients) {
  console.log("groupedIngredientsVALIDATE: ", groupedIngredients);
  let errors: {
    LIQ?: string;
    FRU?: string;
    VEG?: string;
    GRA?: string;
    NUT?: string;
    SUP?: string;
  } = {};

  switch (true) {
    case !groupedIngredients.LIQ?.length:
      errors.LIQ = "CHOOSE A LIQUID";
    case !groupedIngredients.FRU?.length:
      errors.FRU = "CHOOSE A FRUIT";
    case !groupedIngredients.VEG?.length:
      errors.VEG = "CHOOSE A VEGETABLE";
    case !groupedIngredients.GRA?.length:
      errors.GRA = "CHOOSE A GRAIN";
    case !groupedIngredients.NUT?.length:
      errors.NUT = "CHOOSE A NUT";
    case !groupedIngredients.SUP?.length:
      errors.SUP = "CHOOSE A SUPPLEMENT";
    default:
      break;
  }

  return Object.keys(errors).length ? errors : null;
}
