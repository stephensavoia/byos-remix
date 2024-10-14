import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getIngredients, getIngredientsByIds } from "~/db/smoothies";
import { urlDecode } from "~/functions/urlDecode";

export async function loader({ params }: LoaderFunctionArgs) {
  // "Units" out of 4. So 4 --> 1 cups/tbsp, 8 --> 2 cups/tbsp, 1 --> 0.25 cups/tbsp, etc.
  // const quantityKey: {
  //   [key in "LIQ" | "FRU" | "VEG" | "GRA" | "NUT" | "SUP"]: number;
  // } = {
  //   LIQ: 4,
  //   FRU: 8,
  //   VEG: 4,
  //   GRA: 1,
  //   NUT: 8,
  //   SUP: 16,
  // };

  // for (const [key, value] of Object.entries(groupedIngredients)) {
  //   const quantity = Number(
  //     quantityKey[key as keyof typeof quantityKey] / value.length
  //   );

  //   value.forEach((ingredientId) => {
  //     smoothieIngredients.push({
  //       IngredientID: ingredientId,
  //       Quantity: quantity,
  //     });
  //   });
  // }

  const { urlCode } = params;

  const groupedIngredients = urlDecode(String(urlCode));

  // const ingredients = getIngredientsByIds(groupedIngredients);

  return urlCode;
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
  const data = useLoaderData<typeof loader>();

  return (
    <div className="main-container ride-page-container">{String(data)}</div>
  );
}
