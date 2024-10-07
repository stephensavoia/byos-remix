interface IngredientCategorySelectProps {
  category: string;
  ingredients: any[];
}

const IngredientCategorySelect: React.FC<IngredientCategorySelectProps> = ({
  category,
  ingredients,
}) => {
  const categoryCode = category.substring(0, 3);

  // Formula for title height is 1 + 3 * (number of rows)
  // Formula for row height is 2 * (number of rows)
  // Needs to be hardcoded so that Tailwind finds it
  const heightMap: {
    [key: string]: { categoryTitle: string; checkboxUl: string };
  } = {
    LIQ: {
      categoryTitle: `h-[8.25rem] lg:[h-6.25rem]`,
      checkboxUl: `h-[4rem] lg:h-[2rem]`,
    },
    FRU: { categoryTitle: `h-[26rem]`, checkboxUl: `h-[14rem]` },
    VEG: { categoryTitle: `h-[20rem]`, checkboxUl: `h-[11rem]` },
    GRA: { categoryTitle: `h-[14rem]`, checkboxUl: `h-[8rem]` },
    NUT: { categoryTitle: `h-[14rem]`, checkboxUl: `h-[8rem]` },
    SUP: { categoryTitle: `h-[32rem]`, checkboxUl: `h-[17rem]` },
  };

  let categoryTitleHeight = heightMap[categoryCode].categoryTitle;
  let checkboxUlHeight = heightMap[categoryCode].checkboxUl;

  if (category.includes("/")) category = category.replace("/", "/\n");

  return (
    <div className="flex items-start">
      <h2
        className={`w-16 h-[6.25rem] flex items-center justify-center bg-[#f8f7f5] my-1.5 ml-4 lg:mx-0`}
      >
        <span className="transform -rotate-90 block leading-5 text-center">
          {category}
        </span>
      </h2>
      <div
        className={`w-full bg-[#f8f7f5] h-[6.25rem] my-1.5 pl-1 py-[1.25rem]`}
      >
        <span className="block text-base h-[1.75rem] w-1/2 md:w-1/4">
          CHOOSE 1
        </span>
        <ul className={`flex flex-col flex-wrap h-[2rem] w-full mr-4 lg:mx-0`}>
          {ingredients.map((ingredient) => (
            <li
              key={ingredient.IngredientID}
              className="flex items-center justify-start w-1/2 md:w-1/4 h-[2rem]"
            >
              <label className="label cursor-pointer flex items-center">
                <input
                  type="checkbox"
                  name={categoryCode}
                  value={ingredient.IngredientID}
                  className="checkbox checkbox-primary checkbox-xs"
                />
                <span className="label-text pl-1">
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
