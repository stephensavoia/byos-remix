import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import IngredientCategorySelect from "~/components/IngredientCategorySelect";
import { getIngredients } from "~/db/smoothies";

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
  const groupedIngredients: { [key: string]: number[] } = {};
  let smoothieName = "My Smoothie";
  const smoothieIngredients: { IngredientID: number; Quantity: number }[] = [];

  for (let [key, value] of formData.entries()) {
    if (groupedIngredients[key]) {
      groupedIngredients[key].push(Number(value));
    } else {
      if (key === "smoothieName") {
        smoothieName = String(value);
      } else {
        groupedIngredients[key] = [Number(value)];
      }
    }
  }

  const quantityKey: {
    [key in "LIQ" | "FRU" | "VEG" | "GRA" | "NUT" | "SUP"]: number;
  } = {
    LIQ: 1,
    FRU: 2,
    VEG: 1,
    GRA: 0.25,
    NUT: 2,
    SUP: 3,
  };

  for (const [key, value] of Object.entries(groupedIngredients)) {
    const quantity = Number(
      quantityKey[key as keyof typeof quantityKey] / value.length
    );
    console.log("value.length", value.length);
    console.log(
      "quantityKey[key as keyof typeof quantityKey]",
      quantityKey[key as keyof typeof quantityKey]
    );
    console.log("quantity", quantity);

    value.forEach((ingredientId) => {
      smoothieIngredients.push({
        IngredientID: ingredientId,
        Quantity: quantity,
      });
    });
  }

  const data = {
    RecipeName: smoothieName,
    Ingredients: smoothieIngredients,
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
  const mainDivTest = useRef<HTMLDivElement>(null);
  const { groupedIngredients } = useLoaderData<typeof loader>();
  const response = useActionData<typeof action>();

  useEffect(() => {
    console.log("response", response);
  });

  useEffect(() => {
    if (response && mainDivTest.current) {
      mainDivTest.current.innerHTML = JSON.stringify(response);
    }
  }, [response]);

  return (
    <>
      <div ref={mainDivTest} className="max-w-[825px] m-auto">
        <Form method="post">
          {Object.keys(groupedIngredients).map((category) => (
            <IngredientCategorySelect
              key={category.substring(0, 3)}
              category={category}
              ingredients={groupedIngredients[category]}
            />
          ))}
          <label className="form-control w-full px-4">
            <div className="label text-base">NAME YOUR SMOOTHIE:</div>
            <input
              name="smoothieName"
              type="text"
              placeholder={`e.g. "Green Mojito Smoothie"`}
              className="input input-bordered w-full placeholder-italic"
            />
          </label>
          <button
            type="submit"
            className="btn btn-neutral block mt-4 mb-8 mx-auto"
          >
            BUILD SMOOTHIE
          </button>
        </Form>
        <div className="divider text-base px-4">YOUR NEW MINDSET</div>
        <div className="hero px-4">
          <div className="hero-content text-center pb-8">
            <div className="max-w-xl">
              <h1 className="text-5xl">ENJOY THE HEALTHY FOODS YOU LOVE</h1>
              <p className="py-6">
                Eating healthy can be tough these days. We're bombarded with
                rules—"Eat this much of this vitamin, that many calories, and
                these nutrients." I created <em>Build Your Own Smoothie</em> to
                flip that approach. Just pick the foods you're craving (from a
                list of healthy, whole food options), and with one click, you'll
                get a perfectly portioned smoothie recipe, along with its health
                benefits. Satisfy your cravings first, and take note of the
                health perks after!
              </p>
              <p>
                <em>—Alessandra Cardin</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
