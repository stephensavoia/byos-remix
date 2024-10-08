interface IngredientCategorySelectProps {
  category: string;
  ingredients: any[];
}

const IngredientCategorySelect: React.FC<IngredientCategorySelectProps> = ({
  category,
  ingredients,
}) => {
  const categoryCode = category.substring(0, 3);

  // Formula for categoryTitleHeight is 4.25 + 2.25 * (number of rows)
  // Formula for checkboxUlHeight is 2.25 * (number of rows)
  // Needs to be hardcoded so that Tailwind finds it
  // Default values are for 1 row of ingredients (i.e. the LIQUID category)
  let categoryTitleHeight = `h-[8.75rem] lg:h-[6.5rem]`;
  let checkboxUlHeight = `h-[4.5rem] lg:h-[2.25rem]`;
  let maxChoices = "1";

  switch (categoryCode) {
    case "FRU":
      categoryTitleHeight = `h-[22.25rem] lg:h-[13.25rem]`;
      checkboxUlHeight = `h-[18rem] lg:h-[9rem]`;
      maxChoices = "1 – 4";
      break;
    case "VEG":
      categoryTitleHeight = `h-[17.75rem] lg:h-[11rem]`;
      checkboxUlHeight = `h-[13.5rem] lg:h-[6.75rem]`;
      maxChoices = "1 – 2";
      break;
    case "GRA":
      categoryTitleHeight = `h-[13.25rem] lg:h-[8.75rem]`;
      checkboxUlHeight = `h-[9rem] lg:h-[4.5rem]`;
      break;
    case "NUT":
      categoryTitleHeight = `h-[13.25rem] lg:h-[8.75rem]`;
      checkboxUlHeight = `h-[9rem] lg:h-[4.5rem]`;
      maxChoices = "1 – 2";
      break;
    case "SUP":
      categoryTitleHeight = `h-[26.75rem] lg:h-[15.5rem]`;
      checkboxUlHeight = `h-[22.5rem] lg:h-[11.25rem]`;
      maxChoices = "1 – 3";
      break;
  }

  if (category.includes("/")) category = category.replace("/", "/\n");

  return (
    <div className="flex items-start px-4">
      <h2
        className={`w-16 ${categoryTitleHeight} flex items-center justify-center bg-[#f8f7f5] my-1.5`}
      >
        <span className="transform -rotate-90 block leading-5 text-center">
          {category}
        </span>
      </h2>
      <div
        className={`w-full bg-[#f8f7f5] ${categoryTitleHeight} my-1.5 pl-1 py-[1.25rem]`}
      >
        <span className="block text-base h-[1.75rem] w-1/2 md:w-1/4">
          CHOOSE {maxChoices}
        </span>
        <ul className={`flex flex-col flex-wrap ${checkboxUlHeight} w-full`}>
          {ingredients.map((ingredient) => (
            <li
              key={ingredient.IngredientID}
              className="flex items-center justify-start w-1/2 md:w-1/4 h-[2.25rem]"
            >
              <label className="label cursor-pointer flex items-center h-[2rem]">
                <input
                  type="checkbox"
                  name={categoryCode}
                  value={ingredient.IngredientID}
                  className="checkbox checkbox-primary checkbox-xs"
                />
                <span className="label-text text-base pl-1">
                  {ingredient.IngredientName}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientCategorySelect;
