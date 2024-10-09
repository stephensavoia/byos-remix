import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import IngredientCategorySelect from "~/components/IngredientCategorySelect";
import { getIngredients } from "~/db/smoothies";

export const meta: MetaFunction = () => {
  return [
    { title: "Build Your Own Smoothie | Alessandra Cardin" },
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
  const mainDivTest = useRef<HTMLDivElement>(null);
  const { groupedIngredients } = useLoaderData<typeof loader>();
  const response = useActionData();

  useEffect(() => {
    if (response && mainDivTest.current) {
      mainDivTest.current.innerHTML = JSON.stringify(response);
    }
  }, [response]);

  return (
    <>
      <div ref={mainDivTest} className="max-w-[825px] m-auto">
        {/* <label className="px-4 lg:px-0">SELECT YOUR INGREDIENTS:</label> */}
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
          <div className="hero-content text-center pb-6">
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
