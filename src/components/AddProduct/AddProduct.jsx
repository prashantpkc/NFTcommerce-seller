import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Layout from "../Layout/Layout";
import { createProductThunk } from "../../redux/slices/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const fileInputColorImagesRef = useRef(null);

  const [productData, setProductData] = useState({
    name: "",
    gender: "",
    category: "",
    fabric: "",
    pattern: "",
    description: "",
    price: "",
    items: [], // Store items with color and sizes
  });

  const [currentColor, setCurrentColor] = useState("");
  const [currentColorImages, setCurrentColorImages] = useState([]);
  const [currentSizes, setCurrentSizes] = useState([]);

  const colorOptions = ["Red", "Blue", "Green", "Black", "White"];
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];
  const categoryOptions = ["Shirt", "Jeans", "Pant", "T-Shirt", "All"];
  const fabricOptions = ["Cotton", "Denim", "Polyester", "All"];
  const genderOptions = ["Men", "Women", "All"];
  const patternOptions = ["Solid", "Striped", "All"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSizes = [...currentSizes];
    updatedSizes[index] = {
      ...updatedSizes[index],
      [name]: value,
    };
    setCurrentSizes(updatedSizes);
  };

  const addSize = () => {
    setCurrentSizes([...currentSizes, { size: "", stock: "" }]);
  };

  const handleColorImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setCurrentColorImages((prevImages) => [...prevImages, ...files]);
  };

  const addColor = () => {
    if (
      currentColor &&
      currentColorImages.length > 0 &&
      currentSizes.length > 0
    ) {
      const newItem = {
        color: currentColor,
        sizes: currentSizes,
        // colorImages: currentColorImages,
      };

      setProductData((prevData) => ({
        ...prevData,
        items: [...prevData.items, newItem],
      }));

      // Reset the input fields
      setCurrentColor("");
      setCurrentColorImages([]);
      setCurrentSizes([]);
    } else {
      alert("Please fill in all fields for the color before adding.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (
      !productData.name ||
      !productData.price ||
      productData.items.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("gender", productData.gender);
    formData.append("category", productData.category);
    formData.append("fabric", productData.fabric);
    formData.append("pattern", productData.pattern);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
  
    // Append items data as a JSON string
    formData.append("items", JSON.stringify(productData.items));
  
    // Append color image URLs separately
    productData.items.forEach((item) => {
      item.colorImages.forEach((file) => {
        formData.append("colorImageUrl", file);
      });
    });
  
    console.log("Final product data being submitted:", productData);
  
    dispatch(createProductThunk(formData))
      .then((response) => {
        console.log("Product created successfully:", response);
        // Reset the form or navigate to another page
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };
  

  const handleImageClick = () => {
    fileInputColorImagesRef.current?.click();
  };

  return (
    <Layout>
      <div className="mt-[106px] p-6">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Add New Product
        </h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6">
              {/* Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Gender */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={productData.gender}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Fabric */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fabric
                </label>
                <input
                  type="text"
                  name="fabric"
                  value={productData.fabric}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Pattern */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pattern
                </label>
                <input
                  type="text"
                  name="pattern"
                  value={productData.pattern}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Price */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Color and Size Management */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <select
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

              {/* Sizes */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sizes
                </label>
                {currentSizes.map((size, index) => (
                  <div key={index} className="flex space-x-4 mb-4">
                    <input
                      type="text"
                      name="size"
                      value={size.size}
                      onChange={(e) => handleSizeChange(e, index)}
                      placeholder="Size"
                      className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="number"
                      name="stock"
                      value={size.stock}
                      onChange={(e) => handleSizeChange(e, index)}
                      placeholder="Stock"
                      className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSize}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Size
                </button>
              </div>

              {/* Color Images */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Images
                </label>
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Upload Images
                </button>
                <input
                  type="file"
                  ref={fileInputColorImagesRef}
                  onChange={handleColorImageUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <div className="mt-4">
                  {currentColorImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Color preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Add Color Button */}
              <button
                type="button"
                onClick={addColor}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Add Color
              </button>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
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
