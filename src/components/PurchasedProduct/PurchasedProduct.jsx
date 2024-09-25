import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getSoldCoursesBySellerThunk } from "../../redux/slices/productSlice";
import { BackIcon, CrossIcon, SearchIcon } from "../../assets/icon/Icons";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "../utils/useThemeColor";

const PurchasedProduct = () => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { soldCourses, loading, error } = useSelector((state) => state.product);
  const [myproduct, setMyProduct] = useState(soldCourses?.data);
  console.log(myproduct)
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getSoldCoursesBySellerThunk());
  }, [dispatch]);

  const back = () => {
    navigate("/dashboard");
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearch(searchText);
    const filteredProducts = myproduct.filter((item) =>
      item.items.some((sold)=>
          sold.productName.toLowerCase().includes(searchText)
      )
    );
    console.log(filteredProducts, myproduct);
    if (searchText) {
      setMyProduct(filteredProducts);
    } else {
      setMyProduct(soldCourses?.data);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setMyProduct(soldCourses?.data);
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <div className="flex justify-start gap-3 items-center">
          <div
            onClick={back}
            className={`w-8 md:w-12 h-8 md:h-12 bg-[${useThemeColors(isDarkEnabled).cardBg}]  rounded-full flex justify-center items-center cursor-pointer`}
          >
            <BackIcon color={`${useThemeColors(isDarkEnabled).text}`} width="24" height="24" />
          </div>
          <h1 className="text-lg md:text-3xl font-extrabold text-center text-[#fff]">
            Purchased product
          </h1>
        </div>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className={`pl-10 outline-none h-10 md:h-12 rounded-full bg-[${useThemeColors(isDarkEnabled).cardBg}] text-[${useThemeColors(isDarkEnabled).text}] w-32 md:w-48`}
          />
          <div className="absolute top-2 md:top-3 left-2">
            <SearchIcon color="#a5a4a4" width="24" height="24" />
          </div>
          {search && (
            <div
              onClick={clearSearch}
              className="absolute top-3 right-2 w-5 h-5 rounded-full bg-[#c9c8c8]"
            >
              <CrossIcon color="#2e10dc" width="20" height="20" />
            </div>
          )}
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">Error: {error.message}</p>
      )}
      
      <div className={`w-full h-auto md:p-4  bg-[${useThemeColors(isDarkEnabled).cardBg}] mb-2 rounded-2xl`}>
      {!loading &&
        !error &&
        (!Array.isArray(myproduct) ||
          myproduct?.length === 0) && (
          <p className="text-center">No purchased products found.</p>
        )}
        <div className="flex flex-wrap gap-6 p-1 md:p-2">
          {Array.isArray(myproduct) &&
            myproduct?.map((course) => (
              <div
                key={course._id}
                className={`rounded-lg shadow-lg bg-[${useThemeColors(isDarkEnabled).cardBg}] text-[${useThemeColors(isDarkEnabled).text}] hover:bg-gray-100 transition ease-in-out duration-300 w-full sm:w-[calc(33.33%-16px)]`}
              >
                <div className="flex flex-col">
                  <img
                    src={
                      course.items?.[0]?.colorImageUrl ||
                      "https://via.placeholder.com/300"
                    }
                    alt={course.items?.[0]?.productName || "Product Image"}
                    className="w-full h-72 object-cover mb-4 rounded-lg"
                  />

                  <div className="flex justify-between p-2">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        {course.items?.[0]?.productName || "Product Name"}
                      </h2>
                      <p className="text-md mb-2 text-gray-700">
                        Price: ₹{course.items?.[0]?.price?.toFixed(2) || "0.00"}
                      </p>
                      <p className="text-sm mb-2 text-gray-600">
                        {course.items?.[0]?.productName || "Description"}
                      </p>
                      <p className="text-sm mb-2 text-gray-500">
                        Purchased by: {course.userId?.name || "Unknown"}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-col">
                      {Array.isArray(course.items) &&
                        course.items.map((item) => (
                          <div
                            key={item._id}
                            className="flex flex-col mb-2"
                          >
                            <p className="text-sm font-medium text-gray-600">
                              Color: {item.color}
                            </p>
                            <p className="text-sm text-gray-600">
                              Size: {item.size}
                            </p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default PurchasedProduct;
