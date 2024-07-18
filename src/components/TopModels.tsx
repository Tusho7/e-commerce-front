import { TopModelsProps } from "../types/product";
import { removeQuotes } from "../utils/removeQuotes";
import { truncateDescription } from "../utils/tuncateDesc";

const TopModels = ({ products }: TopModelsProps) => {
  console.log(products);
  return (
    <div>
      {products ? (
        <div className="py-4 pl-4 flex flex-col gap-5 text-white">
          <h1>Top Models</h1>
          <div className="flex overflow-x-auto gap-4 ">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[135px] max-w-[135px]"
              >
                <div className="aspect-w-3 aspect-h-2 h-[100px] bg-white flex justify-center items-center p-1 mb-2 rounded-lg">
                  <img
                    src={`${import.meta.env.VITE_API_STORAGE}${
                      product.images.set[0]
                    }`}
                    alt={product.name}
                    className=""
                  />
                </div>

                <div className="text-white flex flex-col gap-[1px]">
                  <h3 className="text-base font-semibold">
                    {removeQuotes(product.name)}
                  </h3>
                  <p className="text-sm mb-2">
                    {truncateDescription(removeQuotes(product.description))}
                  </p>
                  <p className="text-base font-bold">
                    {removeQuotes(product.price)}
                  </p>
                  <p className="text-sm">Stock: {product.stock}</p>
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
