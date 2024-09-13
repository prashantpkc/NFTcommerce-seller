import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getSoldCoursesBySellerThunk } from "../../redux/slices/productSlice";
import { BackIcon, SearchIcon } from "../../assets/icon/Icons";
import { useNavigate } from "react-router-dom";

const PurchasedProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { soldCourses, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getSoldCoursesBySellerThunk());
  }, [dispatch]);

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
          <h1 className="text-lg md:text-3xl font-extrabold text-center text-[#fff]">
            Purchased product
          </h1>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 outline-none h-10 md:h-12 rounded-full text-[#0a0a0a] w-32 md:w-48"
          />
          <div className="absolute top-2 md:top-3 left-2">
            <SearchIcon color="#a5a4a4" width="24" height="24" />
          </div>
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">Error: {error.message}</p>
      )}
      {!loading &&
        !error &&
        (!Array.isArray(soldCourses?.data) ||
          soldCourses?.data?.length === 0) && (
          <p className="text-center">No purchased products found.</p>
        )}
      <div className="w-full h-auto md:p-4 bg-[#fff] mb-2 rounded-2xl">
        <div className="flex flex-wrap gap-6 p-1 md:p-2">
          {Array.isArray(soldCourses?.data) &&
            soldCourses?.data.map((course) => (
              <div
                key={course._id}
                className="rounded-lg shadow-lg bg-white hover:bg-gray-100 transition ease-in-out duration-300 w-full sm:w-[calc(33.33%-16px)]"
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
                            <p className="text-sm font-medium text-gray-800">
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
                <div className="p-2">
                <div className="mt-4 h-12 w-full cursor-pointer bg-[#18074f] rounded-xl flex justify-center items-center">
                  <p className="text-white">Purchased history</p>
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
