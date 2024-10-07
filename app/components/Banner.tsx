import { Link } from "@remix-run/react";

const Banner = () => {
  return (
    <Link
      to="/"
      className="bg-black text-white text-base flex w-full justify-center p-2"
    >
      VIEW OUR RECOMMENDED BLENDERS
    </Link>
  );
};

export default Banner;
