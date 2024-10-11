import { useState } from "react";

interface IngredientCategorySelectProps {
  category: string;
  ingredients: any[];
  error: string | null;
}

const IngredientCategorySelect: React.FC<IngredientCategorySelectProps> = ({
  category,
  ingredients,
  error,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientID = event.target.value;
    if (event.target.checked) {
      setSelectedIngredients([...selectedIngredients, ingredientID]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter((id) => id !== ingredientID)
      );
    }
  };

  const categoryCode = category.substring(0, 3);

  // Formula for categoryTitleHeight is 4.25 + 2.25 * (number of rows)
  // Formula for checkboxUlHeight is 2.25 * (number of rows)
  // Needs to be hardcoded so that Tailwind finds it
  // Default values are for 1 row of ingredients (i.e. the LIQUID category)
  let categoryTitleHeight = `h-[8.75rem] lg:h-[6.5rem]`;
  let checkboxUlHeight = `h-[4.5rem] lg:h-[2.25rem]`;
  let maxChoices = 1;

  switch (categoryCode) {
    case "FRU":
      categoryTitleHeight = `h-[22.25rem] lg:h-[13.25rem]`;
      checkboxUlHeight = `h-[18rem] lg:h-[9rem]`;
      maxChoices = 4;
      break;
    case "VEG":
      categoryTitleHeight = `h-[17.75rem] lg:h-[11rem]`;
      checkboxUlHeight = `h-[13.5rem] lg:h-[6.75rem]`;
      maxChoices = 2;
      break;
    case "GRA":
      categoryTitleHeight = `h-[13.25rem] lg:h-[8.75rem]`;
      checkboxUlHeight = `h-[9rem] lg:h-[4.5rem]`;
      break;
    case "NUT":
      categoryTitleHeight = `h-[13.25rem] lg:h-[8.75rem]`;
      checkboxUlHeight = `h-[9rem] lg:h-[4.5rem]`;
      maxChoices = 2;
      break;
    case "SUP":
      categoryTitleHeight = `h-[26.75rem] lg:h-[15.5rem]`;
      checkboxUlHeight = `h-[22.5rem] lg:h-[11.25rem]`;
      maxChoices = 3;
      break;
  }

  if (category.includes("/")) category = category.replace("/", "/\n");

  return (
    <div className="flex items-start px-4">
      <h2
        className={`w-16 ${
          error &&
          (selectedIngredients.length < 1 ||
            selectedIngredients.length > maxChoices)
            ? "bg-red-100"
            : "bg-[#f8f7f5]"
        } ${categoryTitleHeight} flex items-center justify-center bg-[#f8f7f5] my-1.5`}
      >
        <span className="transform -rotate-90 block leading-5 text-center">
          {category}
        </span>
      </h2>
      <div
        className={`w-full ${
          error &&
          (selectedIngredients.length < 1 ||
            selectedIngredients.length > maxChoices)
            ? "bg-red-100"
            : "bg-[#f8f7f5]"
        }  ${categoryTitleHeight} my-1.5 pl-1 py-[1.25rem]`}
      >
        <span className="flex text-base h-7 align-center items-center w-full">
          {`CHOOSE 1${maxChoices > 1 ? ` – ${maxChoices}` : ""}`}
          {error &&
          (selectedIngredients.length < 1 ||
            selectedIngredients.length > maxChoices) ? (
            <div className="badge badge-error h-6 text-base ml-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>

              <span className="inline-block ml-1">{error}</span>
            </div>
          ) : null}
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
                  onChange={handleCheckboxChange}
                  disabled={
                    selectedIngredients.length >= maxChoices &&
                    !selectedIngredients.includes(
                      String(ingredient.IngredientID)
                    )
                  }
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
