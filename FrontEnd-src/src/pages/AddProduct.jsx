import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useProduct from "../hook/useProduct";
import { MdAddChart } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { CgPlayListRemove } from "react-icons/cg";
import { CiCircleRemove } from "react-icons/ci";
import { toast } from "react-toastify";

const CATEGORY_OPTIONS = [
  { label: "Makeup", id: "CT001" },
  { label: "Haircare", id: "CT003" },
  { label: "Skincare", id: "CT002" },
];

const AddProduct = () => {
  const { currency, handleAddProduct } = useProduct();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      brand: "",
      origin: "",
      description: "",
      price: "",
      categories: [],
      classifications: [{ name: "", quantity: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "classifications",
  });

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    if (images.length + selected.length > 5) {
      toast.error("You can upload up to 5 images only.");
      return;
    }
    setImages((prev) => [...prev, ...selected]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const submitHandler = async (data) => {
    if (!data.categories || data.categories.length === 0) {
      toast.error("You have to choose at least one category");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least 1 product image.");
      return;
    }

    const hasValidClassification = data.classifications.some(
      (cls) => cls.name.trim() !== "" && cls.quantity !== ""
    );

    if (!hasValidClassification) {
      toast.error("You have to add at least one classification");
      return;
    }

    const product = {
      name: data.name.trim(),
      brand: data.brand.trim(),
      origin: data.origin.trim(),
      description: data.description.trim(),
      price: Number(data.price),
      categories: data.categories,
      classifications: data.classifications.map((cls) => ({
        name: cls.name.trim(),
        quantity: Number(cls.quantity),
      })),
    };

    const { success } = await handleAddProduct(product, images);
    if (success) {
      reset();
      setImages([]);
    }
  };

  const watchPrice = watch("price");

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-8 shadow space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-pink-500 flex items-center justify-center gap-2">
        <MdAddChart className="text-pink-400" />
        Add Product
      </h2>

      <input
        {...register("name", { required: true })}
        placeholder="Product Name"
        className="w-full bg-gray-100 border border-gray-300 text-slate-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-200"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <input
        {...register("brand", { required: true })}
        placeholder="Brand"
        className="w-full bg-gray-100 border border-gray-300 text-slate-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-200"
      />
      {errors.brand && (
        <p className="text-red-500 text-sm">{errors.brand.message}</p>
      )}

      <input
        {...register("origin", { required: true })}
        placeholder="Origin"
        className="w-full bg-gray-100 border border-gray-300 text-slate-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-200"
      />
      {errors.origin && (
        <p className="text-red-500 text-sm">{errors.origin.message}</p>
      )}

      <textarea
        {...register("description", { required: true })}
        placeholder="Description"
        className="w-full bg-gray-100 border border-gray-300 text-slate-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-200"
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}

      <div>
        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Price"
          className="w-full bg-gray-100 border border-gray-300 text-slate-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-200"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
        {watchPrice && (
          <p className="text-gray-500 text-sm mt-1">
            💰 {Number(watchPrice).toLocaleString()} {currency}
          </p>
        )}
      </div>

      <div>
        <p className="font-semibold text-gray-700 mb-2">📂 Categories</p>
        <div className="flex gap-4 flex-wrap">
          {CATEGORY_OPTIONS.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 text-gray-700"
            >
              <input
                type="checkbox"
                value={cat.id}
                {...register("categories")}
                className="accent-pink-400"
              />
              {cat.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-pink-500 mt-6">
          <FaBookmark />
          Classifications
        </h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-300 rounded p-4 space-y-2 bg-gray-50"
          >
            <input
              {...register(`classifications.${index}.name`, { required: true })}
              placeholder="Classification Name"
              className="w-full bg-white border border-gray-300 px-3 py-2 rounded"
            />
            <input
              type="number"
              {...register(`classifications.${index}.quantity`, {
                required: true,
              })}
              placeholder="Quantity"
              className="w-full bg-white border border-gray-300 px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-rose-500 text-sm flex items-center gap-1"
            >
              <CgPlayListRemove /> Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ name: "", quantity: "" })}
          className="mt-2 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded transition"
        >
          ➕ Add Classification
        </button>
      </div>

      <div>
        <label className="font-semibold text-gray-700 block mb-2">
          🖼 Product Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          disabled={images.length >= 5}
          className="w-full disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="text-sm text-gray-500 mt-1">
          {images.length}/5 images selected
        </p>
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border border-gray-300 rounded overflow-hidden group"
              >
                <a
                  href={URL.createObjectURL(img)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full hover:bg-red-100"
                >
                  <CiCircleRemove className="text-red-500 text-lg" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded transition"
        >
          Submit Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
