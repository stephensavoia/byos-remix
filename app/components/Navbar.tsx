const Navbar = () => {
  return (
    <div className="drawer drawer-end px-4">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar bg-base-100 flex max-w-[825px] m-auto px-4">
          <div className="flex-1 justify-start">
            {/* <button className="btn btn-neutral">+ Build a Smoothie</button> */}
          </div>
          <div className="flex-4 justify-center">
            <a className="text-xl cursor-pointer">
              <h1 className="text-center">BUILD YOUR OWN SMOOTHIE</h1>
            </a>
          </div>
          <div className="flex-1 justify-end">
            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w- pl-4 pr-8">
          <li className="flex-row justify-end mb-1">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="btn btn-square btn-ghost shadow-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </li>
          {/* Sidebar content here */}
          <li>
            <a>BUILD A SMOOTHIE</a>
          </li>
          <li>
            <a>BROWSE RECIPES</a>
          </li>
          <li>
            <a>BUY A BLENDER</a>
          </li>
          <li>
            <a>ABOUT</a>
          </li>
          <li className="mt-auto mb-4">
            <div className="card card-compact bg-base-100 hover:bg-base-100 active:bg-base-100 w-96 shadow-lg">
              <figure>
                <img src="/img/blender.jpg" alt="Blender" />
              </figure>
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-neutral w-full">
                    BUY A BLENDER
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
