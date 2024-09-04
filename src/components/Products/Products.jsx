import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerProductsThunk } from '../../redux/slices/productSlice';
import Layout from '../Layout/Layout';

const Products = () => {
  const dispatch = useDispatch();
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

  if (error) return <div>Error: {error?.message || 'Something went wrong'}</div>;

  return (
    <Layout>
      <div className="flex flex-wrap gap-6 p-4 mt-[106px] justify-center">
        {products?.data && products.data.length > 0 ? (
          products.data.map((product) => {
            const selectedColorDetails = getSelectedColorDetails(product._id);

            return (
              <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col w-full sm:w-[calc(33.33%-16px)]">
                {/* Main Product Image */}
                <div className="relative">
                  <img
                    src={selectedColorDetails?.colorImageUrl || product.items[0]?.colorImageUrl || 'https://via.placeholder.com/600x400'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Color selection */}
                <div className="flex justify-center gap-2 p-2">
                  {product.items.map((item) => (
                    <div
                      key={item._id}
                      className={`w-8 h-8 rounded-full cursor-pointer border ${selectedColors[product._id] === item.color ? 'border-black' : ''}`}
                      style={{
                        backgroundColor: item.color,
                      }}
                      onClick={() => handleColorClick(product._id, item.color)}
                    />
                  ))}
                </div>

                {/* Product Details */}
                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-gray-600">Gender: {product.gender}</p>
                  <p className="text-gray-600">Category: {product.category}</p>
                  <p className="text-gray-600">Fabric: {product.fabric}</p>
                  <p className="text-gray-600">Pattern: {product.pattern}</p>
                </div>

                {/* Show details for the selected color */}
                <div className="p-4">
                  {selectedColors[product._id] ? (
                    <>
                      <div>
                        <p className="text-lg font-semibold">Color: {selectedColorDetails?.color || 'Not Available'}</p>
                        <p className="text-gray-600">Available Sizes:</p>
                        <ul className="list-disc pl-5">
                          {selectedColorDetails?.sizes.length > 0 ? (
                            selectedColorDetails.sizes.map((size) => (
                              <li key={size._id}>
                                <span className="font-semibold">Size:</span> {size.size} - <span className="font-semibold">Stock:</span> {size.stock}
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
            );
          })
        ) : (
          <div>No products available</div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
