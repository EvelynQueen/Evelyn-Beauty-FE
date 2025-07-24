import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Heading from "../components/Heading";
import { GiLipstick } from "react-icons/gi";
import { toast } from "react-toastify";
import { allProductsDetailAPI } from "../api/allProductAPI";
import { updateProductAPI } from "../api/getCartAPI";

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      images: [],
      quantity: "",
    },
  });

  // Fetch product detail on mount / productId change
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await allProductsDetailAPI(productId);
        setProductDetail(data);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
      }
    };
    fetchDetail();
  }, [productId]);

  // Populate form fields (and pre-select if exactly one classification)
  useEffect(() => {
    if (!productDetail) return;

    const { name, brand, origin, price, description, classifications } =
      productDetail;

    setValue("name", name);
    setValue("brand", brand);
    setValue("origin", origin);
    setValue("price", price);
    setValue("description", description);

    if (classifications?.length === 1) {
      const only = classifications[0];
      setSelectedClassId(only.classificationId);
      setValue("quantity", only.quantity);
    }
  }, [productDetail, setValue]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    setValue("images", [...(watch("images") || []), ...files], {
      shouldValidate: true,
    });
    e.target.value = "";
  };

  // Remove one selected file
  const handleRemoveFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setValue("images", newFiles, { shouldValidate: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit handler
  const onSubmit = async (data) => {
    // confirm before proceeding
    if (!window.confirm("Are you sure you want to update this product?")) {
      return;
    }

    const formData = new FormData();
    ["name", "brand", "origin", "price", "description"].forEach((key) =>
      formData.append(key, data[key])
    );

    // include selected images
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    // include classificationId + quantity if one is selected
    if (selectedClassId) {
      formData.append("classificationId", selectedClassId);
      formData.append("quantity", data.quantity);
    }

    try {
      await updateProductAPI(productId, formData);
      toast.success("Product updated successfully!");
      const updated = await allProductsDetailAPI(productId);
      setProductDetail(updated);
      setSelectedFiles([]);
      setSelectedClassId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Failed to update product:", err);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="w-full mx-auto px-4">
      <Heading icons={GiLipstick} title="Product Detail" />

      {productDetail && (
        <div className="w-full px-6">
          {/* Categories (read-only) */}
          {productDetail.categories.length > 0 && (
            <div className="text-right mb-4">
              {productDetail.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="py-2 px-4 bg-pink-400 text-white rounded-lg mx-1"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Product name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 250, message: "Max 250 characters" },
                })}
                className="w-full border p-2 rounded"
              />
              <p className="text-sm text-gray-500 text-right">
                {watch("name")?.length || 0}/250
              </p>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label className="block mb-1 font-medium">Brand</label>
              <input
                type="text"
                {...register("brand", {
                  required: "Product brand is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 250, message: "Max 250 characters" },
                })}
                className="w-full border p-2 rounded"
              />
              <p className="text-sm text-gray-500 text-right">
                {watch("brand")?.length || 0}/250
              </p>
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand.message}</p>
              )}
            </div>

            {/* Origin */}
            <div>
              <label className="block mb-1 font-medium">Origin</label>
              <input
                type="text"
                {...register("origin", {
                  required: "Origin is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 250, message: "Max 250 characters" },
                })}
                className="w-full border p-2 rounded"
              />
              <p className="text-sm text-gray-500 text-right">
                {watch("origin")?.length || 0}/250
              </p>
              {errors.origin && (
                <p className="text-red-500 text-sm">{errors.origin.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1000, message: "Lowest price must be 1,000" },
                  max: {
                    value: 1000000000,
                    message: "Highest price must be 1,000,000,000",
                  },
                })}
                className="w-full border p-2 rounded"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                rows={4}
                className="w-full border p-2 rounded"
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 500, message: "Max 500 characters" },
                })}
              />
              <p className="text-sm text-gray-500 text-right">
                {watch("description")?.length || 0}/500
              </p>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            {/* Classifications → clickable tags + quantity */}
            {productDetail.classifications?.length > 0 && (
              <div>
                <label className="block mb-1 font-medium">Variants</label>
                <div className="flex gap-2 mb-4">
                  {productDetail.classifications.map((cl) => (
                    <button
                      key={cl.classificationId}
                      type="button"
                      onClick={() => {
                        setSelectedClassId(cl.classificationId);
                        setValue("quantity", cl.quantity);
                      }}
                      className={
                        "px-4 py-1 rounded-md " +
                        (selectedClassId === cl.classificationId
                          ? "bg-yellow-200 text-gray-600 border border-gray-600"
                          : "bg-gray-100")
                      }
                    >
                      {cl.name}
                    </button>
                  ))}
                </div>

                {selectedClassId && (
                  <div className="mb-6">
                    <label className="block mb-1 font-medium">Quantity</label>
                    <input
                      type="number"
                      {...register("quantity", {
                        required: "Quantity is required",
                        min: { value: 0, message: "Must be at least 0" },
                      })}
                      className="w-32 border p-2 rounded"
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
            {/* Images */}
            <div>
              <label className="block mb-1 font-medium">Product Images</label>

              {/* Existing images */}
              {productDetail.images?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {productDetail.images.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      onClick={() => window.open(src, "_blank")}
                      alt={`Current image ${idx + 1}`}
                      className="h-24 w-24 object-cover border rounded cursor-pointer"
                    />
                  ))}
                </div>
              )}

              {/* Hidden file input */}
              <input
                type="file"
                multiple
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-sky-700 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
              >
                Select Files ({selectedFiles.length})
              </button>

              {/* Preview & remove */}
              {selectedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedFiles.map((file, idx) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <div key={idx} className="relative">
                        <img
                          src={url}
                          alt={file.name}
                          className="h-24 w-24 object-cover border rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          &times;
                        </button>
                        <p
                          className="text-xs mt-1 truncate"
                          style={{ maxWidth: "6rem" }}
                        >
                          {file.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`
    px-6 py-2 rounded-lg text-white
    ${
      !isValid || isSubmitting
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-black hover:bg-gray-700"
    }
  `}
            >
              {isSubmitting ? "Updating…" : "Update Product"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
