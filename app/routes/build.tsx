import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getIngredients } from "~/db/smoothies";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const ingredients = getIngredients();
  return { ingredients };
}

export default function Index() {
  const { ingredients } = useLoaderData<typeof loader>();

  // Group ingredients by category
  const groupedIngredients = ingredients.reduce((acc: any, ingredient: any) => {
    const category = ingredient.Category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ingredient);
    return acc;
  }, {});

  return (
    <div>
      <h1>Ingredients</h1>
      {Object.keys(groupedIngredients).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {groupedIngredients[category].map((ingredient: any) => (
              <li key={ingredient.IngredientID}>
                {ingredient.IngredientName} - {ingredient.Category}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
