import { Link } from "@remix-run/react";

const Banner = () => {
  return (
    <Link
      to="/"
      className="bg-black text-white text-sm font-semibold flex w-full justify-center p-2"
    >
      <div className="flex items-center">
        VIEW OUR RECOMMENDED BLENDERS
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </Link>
  );
};

export default Banner;
