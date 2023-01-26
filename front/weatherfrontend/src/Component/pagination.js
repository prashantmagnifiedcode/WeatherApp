import React from "react";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
const Paginate = ({ setPageNumber, pages, page }) => {
  const totalPages = Math.ceil(pages);
  const next = () => {
    if (page != totalPages) {
      setPageNumber(Number(page) + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPageNumber(Number(page) - 1);
    }
  };
  return (
    <div className="py-2 mt-8">
      <nav className="block flex justify-center">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <li>
            <button
              type="button"
              className={`first:ml-0 text-xl font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid bg-white ${
                page < 2 && "hidden"
              }`}
              onClick={prev}
            >
              <BiSkipPrevious />
            </button>
          </li>
          {Array(Math.ceil(totalPages))
            .fill(0)
            .map((val, index) => (
              <li
                key={index}
                onClick={() => setPageNumber(index + 1)}
                className="cursor-pointer"
              >
                <div
                  className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid ${
                    page == index + 1
                      ? "text-red-500 text-lg"
                      : "bg-white text-black"
                  }`}
                >
                  {index + 1}
                </div>
              </li>
            ))}
          <li>
            <button
              className={`first:ml-0 text-xl font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid bg-white ${
                page == totalPages && "hidden"
              }`}
              onClick={next}
            >
              <BiSkipNext />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginate;
