import React, { useEffect, useState } from "react";
import { allProductsDetailAPI } from "../api/allProductAPI";
import { updateProductAPI } from "../api/getCartAPI";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Heading from "../components/Heading";
import { GiLipstick } from "react-icons/gi";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);

  const fetchProductDetail = async () => {
    try {
      const res = await allProductsDetailAPI(productId);
      setProductDetail(res);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    fetchProductDetail();
  }, []);

  useEffect(() => {
    if (productDetail) {
      setValue("name", productDetail.name);
      setValue("origin", productDetail.origin);
      setValue("brand", productDetail.brand);
      setValue("price", productDetail.price);
      setValue("description", productDetail.description);
    }
  }, [productDetail, setValue]);

  const handleUpdateProduct = async (productId, data) => {
    try {
      const formData = new FormData();

      // Thêm toàn bộ field text
      formData.append("name", data.name);
      formData.append("origin", data.origin);
      formData.append("brand", data.brand);
      formData.append("price", data.price);
      formData.append("description", data.description);

      // Thêm ảnh nếu có
      const images = data.images;
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          if (images[i] instanceof File && images[i].size > 0) {
            formData.append("images", images[i]);
          }
        }
      }

      await updateProductAPI(productId, formData);
      toast.success("Cập nhật sản phẩm thành công");
      fetchProductDetail(); // cập nhật UI
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      toast.error("Cập nhật sản phẩm thất bại");
    }
  };

  const handleOnSubmit = (data) => {
    handleUpdateProduct(productId, data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Heading icons={GiLipstick} title="Chi tiết sản phẩm" />

      {productDetail && (
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="space-y-4 mt-6"
        >
          <div>
            <label>Tên sản phẩm</label>
            <input
              className="border p-2 w-full"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <label>Thương hiệu</label>
            <input
              className="border p-2 w-full"
              {...register("brand", { required: true })}
            />
          </div>
          <div>
            <label>Xuất xứ</label>
            <input
              className="border p-2 w-full"
              {...register("origin", { required: true })}
            />
          </div>
          <div>
            <label>Giá</label>
            <input
              className="border p-2 w-full"
              type="number"
              {...register("price", { required: true })}
            />
          </div>
          <div>
            <label>Mô tả</label>
            <textarea
              className="border p-2 w-full"
              rows={4}
              {...register("description", { required: true })}
            />
          </div>

          <div>
            <label>
              Ảnh sản phẩm (chọn 1 hoặc nhiều ảnh mới để thay ảnh cũ)
            </label>
            {productDetail.images?.length > 0 && (
              <div className="flex flex-wrap gap-2 my-2">
                {productDetail.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Ảnh ${idx + 1}`}
                    className="h-20 w-20 object-cover border"
                  />
                ))}
              </div>
            )}
            <input type="file" multiple {...register("images")} />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductDetail;
