import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerProductsThunk } from "../../redux/slices/productSlice";
import Layout from "../Layout/Layout";
import { BackIcon, SearchIcon } from "../../assets/icon/Icons";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.product);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    dispatch(getSellerProductsThunk());
  }, [dispatch]);

  const handleColorClick = (productId, color) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };

  const getSelectedColorDetails = (productId) => {
    const selectedColor = selectedColors[productId];
    if (!products?.data || !selectedColor) return null;

    const product = products.data.find((p) => p._id === productId);
    if (!product) return null;

    return product.items.find((item) => item.color === selectedColor);
  };

  if (loading) return <div>Loading...</div>;

  if (error)
    return <div>Error: {error?.message || "Something went wrong"}</div>;

  const back = () => {
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <div className="flex justify-start gap-3 items-center">
          <div
            onClick={back}
            className="w-8 md:w-12 h-8 md:h-12 bg-[#fff] rounded-full flex justify-center items-center cursor-pointer"
          >
            <BackIcon color="" width="24" height="24" />
          </div>
          <h1 className="text-xl md:text-3xl font-extrabold text-center text-[#fff]">
            Inventory
          </h1>
        </div>
        <div className="relative">
          <input type="text" placeholder="Search" className="pl-10 outline-none h-10 md:h-12 rounded-full text-[#0a0a0a] w-40  md:w-48" />
          <div className="absolute top-2 md:top-3 left-2"><SearchIcon color="#a5a4a4" width="24" height="24"/></div>
        </div> 
      </div>
      <div className="w-full h-auto md:p-4 bg-[#fff] mb-2 rounded-2xl">
        <div className="flex flex-wrap gap-6 p-1 md:p-2">
          {products?.data && products.data.length > 0 ? (
            products.data.map((product) => {
              const selectedColorDetails = getSelectedColorDetails(product._id);

              return (
                <div
                  key={product._id}
                  className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col w-full sm:w-[calc(33.33%-16px)]"
                >
                  <div className="w-full h-72 relative">
                    <img
                      src={
                        selectedColorDetails?.colorImageUrl ||
                        product.items[0]?.colorImageUrl ||
                        "https://via.placeholder.com/600x400"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex justify-center gap-2 p-2">
                    {product.items.map((item) => (
                      <div
                        key={item._id}
                        className={`w-8 h-8 rounded-full cursor-pointer border ${
                          selectedColors[product._id] === item.color
                            ? "border-black"
                            : ""
                        }`}
                        style={{
                          backgroundColor: item.color,
                        }}
                        onClick={() =>
                          handleColorClick(product._id, item.color)
                        }
                      />
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <div className="p-4 flex-grow">
                      <h2 className="text-xl font-bold">{product.name}</h2>
                      <p className="text-gray-600">Gender: {product.gender}</p>
                      <p className="text-gray-600">
                        Category: {product.category}
                      </p>
                      <p className="text-gray-600">Fabric: {product.fabric}</p>
                      <p className="text-gray-600">
                        Pattern: {product.pattern}
                      </p>
                    </div>

                    <div className="p-4">
                      {selectedColors[product._id] ? (
                        <>
                          <div>
                            <p className="text-lg font-semibold">
                              Color:{" "}
                              {selectedColorDetails?.color || "Not Available"}
                            </p>
                            <p className="text-gray-600">Available Sizes:</p>
                            <ul className="list-disc pl-5">
                              {selectedColorDetails?.sizes.length > 0 ? (
                                selectedColorDetails.sizes.map((size) => (
                                  <li key={size._id}>
                                    <span className="font-semibold">Size:</span>{" "}
                                    {size.size} -{" "}
                                    <span className="font-semibold">
                                      Stock:
                                    </span>{" "}
                                    {size.stock}
                                  </li>
                                ))
                              ) : (
                                <li>No sizes available</li>
                              )}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <div>Select a color to see details</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
