import { TopModelsProps } from "../types/product";
import { removeQuotes } from "../utils/removeQuotes";
import { truncateDescription } from "../utils/tuncateDesc";

const TopModels = ({ products }: TopModelsProps) => {
  return (
    <div>
      {products ? (
        <div className="py-4 pl-4 flex flex-col gap-2 text-white md:px-8 md:gap-7 max-w-[1200px] mx-auto">
          <h1 className="text-2xl md:text-3xl">What Users Like Most</h1>
          <div className="flex overflow-x-auto gap-4 md:overflow-x-hidden md:justify-between md:gap-6 md:flex-wrap">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[135px] max-w-[135px] md:w-[180px] md:max-w-[180px]"
              >
                <div className="aspect-w-3 aspect-h-2 h-[100px] flex justify-center items-center  mb-2 rounded-lg md:h-[120px]">
                  <img
                    src={`${import.meta.env.VITE_API_STORAGE}${
                      product.images.set[0]
                    }`}
                    alt={product.name}
                    className="w-full h-full rounded-lg"
                  />
                </div>

                <div className="text-white flex flex-col gap-[1px]">
                  <h3 className="text-xs font-semibold md:text-base">
                    {removeQuotes(product.name)}
                  </h3>
                  <p className="text-sm mb-2 md:text-base">
                    {truncateDescription(removeQuotes(product.description))}
                  </p>
                  <p className="text-xs font-bold md:text-base">
                    {removeQuotes(product.price)}
                  </p>
                  <p className="text-sm md:text-base">Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1>""</h1>
        </div>
      )}
    </div>
  );
};

export default TopModels;
