import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Layout from "../Layout/Layout";
import { createProductThunk } from "../../redux/slices/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const fileInputColorImagesRef = useRef(null);
  const [colors, setColors] = useState([]);

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
  const [previewColors, setPreviewColors] = useState([]);

  // Options for dropdowns
  const colorOptions = [
    "Red",
    "Black",
    "Green",
    "Pink",
    "Orange",
    "Blue",
    "Yellow",
    "White",
  ];
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];
  const categoryOptions = ["Shirt", "Jeans", "Pant", "T-Shirt", "All"];
  const fabricOptions = ["Cotton", "Denim", "Polyester", "All"];
  const genderOptions = ["Men", "Women", "All"];
  const patternOptions = ["Solid", "Striped", "Printed", "All"];

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
        colorImages: currentColorImages,
        sizes: currentSizes,
      };

      setProductData((prevData) => ({
        ...prevData,
        items: [...prevData.items, newItem],
      }));

      // Add to preview
      setPreviewColors((prevColors) => [...prevColors, newItem]);

      // Reset the input fields
      setCurrentColor("");
      setCurrentColorImages([]);
      setCurrentSizes([]);
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
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fabric */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fabric
                </label>
                <select
                  name="fabric"
                  value={productData.fabric}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Fabric</option>
                  {fabricOptions.map((fabric) => (
                    <option key={fabric} value={fabric}>
                      {fabric}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pattern */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pattern
                </label>
                <select
                  name="pattern"
                  value={productData.pattern}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Pattern</option>
                  {patternOptions.map((pattern) => (
                    <option key={pattern} value={pattern}>
                      {pattern}
                    </option>
                  ))}
                </select>
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

              {/* Color */}
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

              {/* Color Images */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleColorImageUpload}
                  ref={fileInputColorImagesRef}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="w-full border border-gray-300 rounded-lg p-3 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Upload Color Images
                </button>
              </div>

              {/* Sizes */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sizes
                </label>

                {currentSizes.map((size, index) => (
                  <div key={index} className="flex gap-4 mb-4">
                    <select
                      name="size"
                      value={size.size}
                      onChange={(e) => handleSizeChange(e, index)}
                      className="border border-gray-300 rounded-lg p-3 w-1/2"
                      required
                    >
                      <option value="">Select Size</option>
                      {sizeOptions.map((sizeOption) => (
                        <option key={sizeOption} value={sizeOption}>
                          {sizeOption}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="stock"
                      value={size.stock}
                      onChange={(e) => handleSizeChange(e, index)}
                      placeholder="Stock"
                      className="border border-gray-300 rounded-lg p-3 w-1/2"
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSize}
                  className="w-full border border-gray-300 rounded-lg p-3 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Size
                </button>
              </div>

              {/* Add Color Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={addColor}
                  className="w-full border border-gray-300 rounded-lg p-3 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Color
                </button>
              </div>
            </div>

            {/* Color Previews */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Color Previews</h2>
              {previewColors.map((colorItem, index) => (
                <div
                  key={index}
                  className="mb-6 border border-gray-300 p-4 rounded-lg"
                >
                  <h3 className="text-lg font-medium mb-2">
                    Color: {colorItem.color}
                  </h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {colorItem.colorImages.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={URL.createObjectURL(image)}
                        alt={`Color ${colorItem.color} Image ${imgIndex + 1}`}
                        className="w-24 h-24 object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Sizes & Stock</h4>
                    {colorItem.sizes.map((size, sizeIndex) => (
                      <div key={sizeIndex} className="mb-2">
                        <span className="font-medium">{size.size}: </span>
                        <span>{size.stock} in stock</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="relative">
              <button
                type="submit"
                className="w-full border border-gray-300 rounded-lg p-3 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
