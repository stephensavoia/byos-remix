import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import IngredientCategorySelect from "~/components/IngredientCategorySelect";
import { getIngredients } from "~/db/smoothies";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const ingredients = getIngredients();

  const groupedIngredients = ingredients.reduce((acc: any, ingredient: any) => {
    const category = ingredient.Category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      IngredientID: ingredient.IngredientID,
      IngredientName: ingredient.IngredientName,
      Category: ingredient.Category,
    });
    return acc;
  }, {});

  return { groupedIngredients };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log("Form data", formData);

  // should return this ( what's needed to mke a new recipe entry with prisma)
  const data = {
    UserID: 1, // Replace with the actual UserID
    RecipeName: "Green Smoothie",
    Ingredients: {
      create: [
        {
          IngredientID: 1, // Replace with the actual IngredientID
          Quantity: 2.5,
        },
        {
          IngredientID: 2, // Replace with the actual IngredientID
          Quantity: 1.0,
        },
      ],
    },
  };

  // return data in response
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default function Index() {
  const { groupedIngredients } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Ingredients</h1>
      <Form method="post">
        {Object.keys(groupedIngredients).map((category) => (
          <IngredientCategorySelect
            key={category.substring(0, 3)}
            category={category}
            ingredients={groupedIngredients[category]}
          />
        ))}
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
