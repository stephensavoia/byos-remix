interface IngredientCategorySelectProps {
  category: string;
  ingredients: any[];
}

const IngredientCategorySelect: React.FC<IngredientCategorySelectProps> = ({
  category,
  ingredients,
}) => {
  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.IngredientID}>
            <label>
              <input
                type="checkbox"
                name={category.substring(0, 3)}
                value={ingredient.IngredientID}
              />
              {ingredient.IngredientName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientCategorySelect;
