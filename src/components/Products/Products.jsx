import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerProductsThunk } from '../../redux/slices/productSlice';
import Layout from '../Layout/Layout';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  console.log(products.data)

  useEffect(() => {
    // Replace with actual seller ID if needed
    dispatch(getSellerProductsThunk());
  }, [dispatch]);

  // Debugging output
//   console.log("Products:", products);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) return <div>Loading...</div>;
  
  if (error) return <div>Error: {error?.message || 'Something went wrong'}</div>;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-[106px]">
        {products.data.length > 0 ? (
          products.data.map((product) => (
            <div key={product._id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-gray-500 mb-2">Price: ${product.price.toFixed(2)}</p>
                <p className="text-gray-500 mb-2">Total Stock: {product.totalStock}</p>
              </div>
              <div className="border-t">
                {product.items.length > 0 ? (
                  product.items.map((item) => (
                    <div key={item._id} className="flex items-center p-4 border-b">
                      <img
                        src={item.colorImageUrl}
                        alt={item.color}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{item.color}</h3>
                        <p className="text-gray-600">Sizes:</p>
                        <ul>
                          {item.sizes.length > 0 ? (
                            item.sizes.map((size) => (
                              <li key={size._id}>
                                Size: {size.size} - Stock: {size.stock}
                              </li>
                            ))
                          ) : (
                            <li>No sizes available</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No items available</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
