import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getSoldCoursesBySellerThunk } from "../../redux/slices/productSlice";

const PurchasedProduct = () => {
  const dispatch = useDispatch();
  const { soldCourses, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getSoldCoursesBySellerThunk());
  }, [dispatch]);

  return (
    <Layout>
      <div className="ml-10 mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Purchased Products</h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error.message}</p>}
        {!loading && !error && (!Array.isArray(soldCourses?.data) || soldCourses?.data?.length === 0) && (
          <p className="text-center">No purchased products found.</p>
        )}

        <div className="flex flex-wrap gap-6 justify-center">
          {Array.isArray(soldCourses?.data) && soldCourses?.data.map((course) => (
            <div key={course._id} className="border p-4 rounded-lg shadow-lg bg-white hover:bg-gray-100 transition ease-in-out duration-300 w-full max-w-sm">
              <div className="flex flex-col items-center">
                <img
                  src={course.items?.[0]?.colorImageUrl || 'https://via.placeholder.com/300'}
                  alt={course.items?.[0]?.productName || 'Product Image'}
                  className="w-full h-40 object-cover mb-4 rounded-lg"
                />
                <h2 className="text-xl font-semibold mb-2 text-center">{course.items?.[0]?.productName || 'Product Name'}</h2>
                <p className="text-md mb-2 text-center text-gray-700">Price: ${course.items?.[0]?.price?.toFixed(2) || '0.00'}</p>
                <p className="text-sm mb-2 text-center text-gray-600">{course.items?.[0]?.productName || 'Description'}</p>
                <p className="text-sm mb-2 text-center text-gray-500">Purchased by: {course.userId?.name || 'Unknown'}</p>
                <div className="mt-4 flex flex-col items-center">
                  {Array.isArray(course.items) && course.items.map((item) => (
                    <div key={item._id} className="flex flex-col items-center mb-2">
                      <p className="text-sm font-medium text-gray-800">Color: {item.color}</p>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-semibold text-lg">Total Amount: ${course.totalAmount?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PurchasedProduct;
