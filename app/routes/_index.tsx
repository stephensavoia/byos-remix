import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
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
        <div className="divider text-base px-4">OUR MINDSET</div>
        <div className="hero">
          <div className="hero-content text-center pb-6">
            <div className="max-w-lg">
              <h1 className="text-5xl">ENJOY THE HEALTHY FOODS YOU LOVE</h1>
              <p className="py-6">
                If you try to have good health, you rae inundated by . Clafasd.
                Reverse approach. Choose the foods you want! THe foods you're
                graving (from healthy whol food options, of course) and we'll
                let you know what benefits of the food are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
