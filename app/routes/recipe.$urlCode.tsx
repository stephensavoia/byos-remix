import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { getIngredientsByIds } from "~/db/smoothies";
import { addQuantitiesToIngredients } from "~/functions/addQuantitiesToIngredients";
import { urlDecode } from "~/functions/urlDecode";
import { IngredientsData } from "~/types/IngredientsData";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { urlCode } = params;
  const url = new URL(request.url);
  const title = (url.searchParams.get("t") || "").toUpperCase();

  const groupedIngredients = urlDecode(String(urlCode));

  const ingredients: IngredientsData = getIngredientsByIds(groupedIngredients);

  addQuantitiesToIngredients(ingredients);

  return { ingredients, title };
}

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  return [
    ...parentMeta,
    { title: "Build Your Own Smoothie | Alessandra Cardin" },
    {
      name: "description",
      content:
        "Build Your Own Smoothie lets you create a perfectly proportioned smoothie recipe in seconds. Pick the foods you're craving from a list of healthy, whole food options), and with one click you're done!",
    },
    { name: "og:url", content: "https://www.buildyourownsmoothie.com/" },
    { name: "og:type", content: "website" },
    {
      name: "og:title",
      content: "Build Your Own Smoothie | Alessandra Cardin",
    },
    {
      name: "og:description",
      content:
        "Build Your Own Smoothie lets you create a perfectly proportioned smoothie recipe in seconds. Pick the foods you're craving from a list of healthy, whole food options), and with one click you're done!",
    },
    {
      name: "og:image",
      content: "https://www.buildyourownsmoothie.com/img/blender-og.png",
    },
  ];
};

export default function recipe() {
  const { ingredients, title } = useLoaderData<typeof loader>();

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  return (
    <div className="main-container ride-page-container">
      <br />
      <h1>{String(title)}</h1>
      {Object.entries(ingredients).map(([category, items]) => (
        <div key={category}>
          <h2>{category}</h2>
          {items.map((item: any) => (
            <div key={item.IngredientID}>
              <p>Name: {item.IngredientName}</p>
              <p>Category: {item.Category}</p>
              <p>Vitamin A: {item.VitaminA}</p>
              <p>Vitamin C: {item.VitaminC}</p>
              <p>Calcium: {item.Calcium}</p>
              <p>Iron: {item.Iron}</p>
              <p>Potassium: {item.Potassium}</p>
              <p>Benefits: {item.Benefits}</p>
              <p>Quantity: {item.Quantity}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
