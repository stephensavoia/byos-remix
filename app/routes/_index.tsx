import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import type { ActionResultErrors } from "~/types/ActionResultErrors";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { useRef } from "react";
import IngredientCategorySelect from "~/components/IngredientCategorySelect";
import { getIngredients } from "~/db/smoothies";
import { validate } from "~/functions/validate";
import { urlEncode } from "~/functions/urlEncode";

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

// TO DO: memoize this loader function because it is the same every time it loads
export async function loader() {
  const ingredients = getIngredients();

  const groupedIngredientData = ingredients.reduce(
    (acc: any, ingredient: any) => {
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
    },
    {}
  );

  return { groupedIngredientData };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const groupedIngredients: { [key: string]: number[] } = {};
  let smoothieName = "My Smoothie";

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

  let errors = await validate(groupedIngredients);
  if (errors) {
    return json({ ok: false, errors }, 400);
  }

  let url = urlEncode(groupedIngredients, smoothieName);

  return redirect(url);
};

export default function Index() {
  const { groupedIngredientData } = useLoaderData<typeof loader>();
  const actionResult = useActionData<ActionResultErrors>();

  return (
    <>
      <div className="max-w-[825px] m-auto">
        <Form method="post">
          {Object.keys(groupedIngredientData).map((category) => {
            const categoryKey = category.substring(0, 3);
            const validKeys = ["LIQ", "FRU", "VEG", "GRA", "NUT", "SUP"];
            return (
              <IngredientCategorySelect
                key={categoryKey}
                category={category}
                ingredients={groupedIngredientData[category]}
                error={
                  validKeys.includes(categoryKey)
                    ? actionResult?.errors?.[categoryKey] ?? null
                    : null
                }
              />
            );
          })}
          <div className="px-4">
            <label className="form-control w-full">
              <div className="flex items-center justify-start">
                <div className="label text-base">
                  NAME YOUR SMOOTHIE (OPTIONAL):
                </div>
              </div>
              <input
                name="smoothieName"
                type="text"
                placeholder={`e.g. "Green Mojito Smoothie"`}
                className="input input-bordered w-full placeholder-italic"
              />
            </label>
            {actionResult?.errors && (
              <div role="alert" className="alert alert-error mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Oops! Check your form inputs and try again.</span>
              </div>
            )}
          </div>
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
