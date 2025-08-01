import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import productCategory from "../helper/productCategory";
import uploadImage from "../helper/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../commen";

function EditProduct({ onClose, productData, fetchData }) {
  const [data, setData] = useState({
    _id: productData?._id || "",
    
    productName: productData?.productName || "",
    brandName: productData?.brandName || "",
    genderCategory: productData?.genderCategory || "",
    category: productData?.category || "",
    productImage: productData?.productImage || [],
    price: productData?.price || 0,
    sellingPrice: productData?.sellingPrice || 0,
    sizes: productData?.sizes || [],
    description: productData?.description || "",
  });

  const [uploadProduct, setUploadProduct] = useState("");
  const [fullscreenImage, setFullScreenImage] = useState("");
  const [openFullImage, setOpenFullImage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      fetchData();
      onClose();
    } else if (result.error) {
      toast.error(result.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2>Edit Product</h2>
          <div className="w-fit ml-auto text-2xl cursor-pointer">
            <IoIosClose onClick={onClose} />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid p-4 pb-5 gap-3 overflow-y-scroll h-full"
        >
          {/* Product Name */}
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={handleChange}
            className="p-1 bg-slate-300 rounded border outline-none"
          />

          {/* Brand Name */}
          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            onChange={handleChange}
            className="p-1 bg-slate-300 rounded border outline-none"
          />

          {/* Gender */}
          <label htmlFor="genderCategory">Gender:</label>
          <select
            id="genderCategory"
            name="genderCategory"
            value={data.genderCategory}
            onChange={(e) => {
              const { value } = e.target;
              setData((prev) => ({
                ...prev,
                genderCategory: value,
                category: "", // Reset category when gender changes
              }));
            }}
            className="p-2 bg-slate-50 border rounded outline-none"
          >
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Category */}
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={data.category}
            onChange={handleChange}
            disabled={!data.genderCategory}
            className="p-2 bg-slate-50 border rounded outline-none"
          >
            {!data.genderCategory ? (
              <option value="">-- Select Gender First --</option>
            ) : (
              <>
                <option value="">-- Select Category --</option>
                {productCategory[data.genderCategory]?.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </>
            )}
          </select>

          {/* Product Image Upload */}
          <label htmlFor="productImage">Product Image:</label>
          <label>
            <div className="p-2 bg-slate-300 border flex items-center flex-col justify-center rounded h-32 w-full">
              <span className="text-4xl">
                <FaCloudUploadAlt />
              </span>
              <p>Upload Image</p>
              <input
                type="file"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setUploadProduct(file.name);
                    const uploaded = await uploadImage(file);
                    setData((prev) => ({
                      ...prev,
                      productImage: [...prev.productImage, uploaded.url],
                    }));
                  }
                }}
              />
            </div>
          </label>
          <div>
            {data.productImage.length > 0 ? (
              <div className="flex items-center gap-3 flex-wrap">
                {data.productImage.map((url, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={url}
                      width={80}
                      height={80}
                      alt=""
                      className="bg-slate-300 border"
                      onClick={() => {
                        setFullscreenImage(url);
                        setOpenFullImage(true);
                      }}
                    />
                    <div
                      onClick={() => handleDelete(index)}
                      className="absolute bottom-0 left-0 p-1 bg-red-500 rounded-full text-white hidden group-hover:block cursor-pointer"
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>*Please Upload Image</p>
            )}
          </div>

          {/* Price */}
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter Price"
            value={data.price}
            onChange={handleChange}
            className="p-1 bg-slate-300 rounded border outline-none"
          />

          {/* Selling Price */}
          <label htmlFor="sellingPrice">Selling Price:</label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter Selling Price"
            value={data.sellingPrice}
            onChange={handleChange}
            className="p-1 bg-slate-300 rounded border outline-none"
          />

          {/* Description */}
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Enter Description"
            value={data.description}
            onChange={handleChange}
            className="p-1 bg-slate-300 rounded border outline-none"
          />

          {/* Submit */}
          <button className="px-3 py-2 bg-red-400 text-white mb-10 rounded">
            Update Product
          </button>
        </form>
      </div>

      {openFullImage && (
        <DisplayImage
          imgUrl={fullscreenImage}
          onClose={() => setOpenFullImage(false)}
        />
      )}
    </div>
  );
}

export default EditProduct;
