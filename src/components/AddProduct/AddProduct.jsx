import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../Layout/Layout';
import { createProductThunk } from '../../redux/slices/productSlice';

const genderOptions = ['Men', 'Women', 'All'];
const categoryOptions = ['Shirt', 'Jeans', 'Pant', 'T-Shirt', 'All'];
const fabricOptions = ['Cotton', 'Denim', 'Polyester', 'All'];
const patternOptions = ['Solid', 'Striped', 'All'];
const colorOptions = ['red', 'black', 'green'];
const sizeOptions = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

const AddProduct = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: '',
    gender: '',
    category: '',
    fabric: '',
    pattern: '',
    description: '',
    price: '',
    items: []
  });

  const [currentColor, setCurrentColor] = useState('');
  const [currentColorImage, setCurrentColorImage] = useState(null);
  const [currentColorImagePreview, setCurrentColorImagePreview] = useState('');
  const [currentSizes, setCurrentSizes] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSizeChange = (e, sizeIndex) => {
    const { name, value } = e.target;
    const updatedSizes = [...currentSizes];
    updatedSizes[sizeIndex][name] = value;
    setCurrentSizes(updatedSizes);
  };

  const addSize = () => {
    setCurrentSizes([...currentSizes, { size: '', stock: '' }]);
  };

  const handleColorImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentColorImage(file);
        setCurrentColorImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addColor = () => {
    if (currentColor && currentColorImage && currentSizes.length > 0) {
      setProductData((prevData) => ({
        ...prevData,
        items: [
          ...prevData.items,
          {
            color: currentColor,
            colorImage: currentColorImage,
            colorImagePreview: currentColorImagePreview,
            sizes: currentSizes
          }
        ]
      }));
      setCurrentColor('');
      setCurrentColorImage(null);
      setCurrentColorImagePreview('');
      setCurrentSizes([]);
    } else {
      alert("Please fill in all fields for the color before adding.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Submitting product data:', productData);
    
    dispatch(createProductThunk(productData))
      .then((response) => {
        console.log('Product created successfully:', response);
        // Optionally reset the form or navigate to another page
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <Layout>
      <div className="mt-[106px] p-6">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Add New Product</h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={productData.gender}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fabric</label>
                  <select
                    name="fabric"
                    value={productData.fabric}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Fabric</option>
                    {fabricOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
                  <select
                    name="pattern"
                    value={productData.pattern}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Pattern</option>
                    {patternOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    placeholder="Enter product price"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Colors and Sizes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Color</label>
                  <select
                    name="currentColor"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Color</option>
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Color Image</label>
                  <input
                    type="file"
                    onChange={handleColorImageUpload}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {currentColorImagePreview && (
                    <img
                      src={currentColorImagePreview}
                      alt="Color Preview"
                      className="mt-4 w-32 h-32 object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Add Sizes</h3>
                {currentSizes.map((sizeObj, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                    <select
                      name="size"
                      value={sizeObj.size}
                      onChange={(e) => handleSizeChange(e, index)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Size</option>
                      {sizeOptions.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="stock"
                      value={sizeObj.stock}
                      onChange={(e) => handleSizeChange(e, index)}
                      placeholder="Enter stock"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSize}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Size
                </button>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={addColor}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add Color
                </button>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
