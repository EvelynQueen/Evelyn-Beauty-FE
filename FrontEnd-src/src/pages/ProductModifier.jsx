import { useState, useEffect } from "react";
import { categories } from "../components/Category";
import allProductAPI from "../api/allProductAPI";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import CategoryStaff from "../components/CategoryStaff";
import { useNavigate } from "react-router-dom";
import useProduct from "../hook/useProduct";

const Shopping = () => {
  // Lấy hàm handleDeleteProduct từ context, nhưng products sẽ được quản lý tại đây
  const { handleDeleteProduct: deleteProductFromContext } = useProduct();
  const [products, setProducts] = useState([]); // State products cục bộ
  const [currency, setCurrency] = useState("VND"); // Thêm currency nếu cần
  const [id, setId] = useState(categories[0].id);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await allProductAPI(id, page, pagination.limit);
        setProducts(res.products || []);
        setPagination(res.pagination || pagination);
      } catch (error) {
        console.log(error.message);
        setProducts([]);
        setPagination({
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 1,
        });
      }
    };

    fetchProducts();
    // SỬA LẠI ĐÚNG Ở ĐÂY:
    // Mảng dependency chỉ cần id và page.
    // Component sẽ tự render lại khi products thay đổi mà không cần effect này chạy lại.
  }, [id, page]);

  const handleOnclick = (productId) => {
    navigate(`/product-modifier/${productId}`);
  };

  const handleDeleteClick = async (event, productId) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Gọi hàm xóa từ context
      await deleteProductFromContext(productId);
      // Cập nhật lại state products cục bộ để giao diện re-render
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.productId !== productId)
      );
    }
  };

  useEffect(() => {
    setPage(1);
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col caret-transparent px-10">
      <div className="w-full mb-20">
        <div className="w-full">
          <div>
            <CategoryStaff selected={id} onChange={setId} />
            <div className="w-full mt-4 space-y-4">
              <div className="hidden sm:grid grid-cols-6 font-semibold text-gray-600 px-4 py-3 text-center border-b border-gray-200">
                <span>Image</span>
                <span>Brand</span>
                <span>Product</span>
                <span>Price</span>
                <span>Stock</span>
                <span className="font-semibold text-gray-600">Actions</span>
              </div>

              {products.map((prod) => (
                <div
                  key={prod.productId}
                  onClick={() => handleOnclick(prod.productId)}
                  className="cursor-pointer grid grid-cols-1 sm:grid-cols-6 items-center bg-[#FFFAFA] hover:shadow-md rounded-xl px-4 py-3 border border-gray-200 text-center gap-6 sm:gap-4"
                >
                  <div className="flex justify-center">
                    <img
                      src={prod.images?.[0] || "/placeholder.png"}
                      alt={prod.name}
                      className="w-28 h-28 rounded-xl object-cover border"
                    />
                  </div>
                  <div className="text-sm text-gray-700">
                    {prod.brand || "N/A"}
                  </div>
                  <div className="text-base font-medium text-blue-800">
                    {prod.name}
                  </div>
                  <div className="text-sm text-red-700 font-semibold">
                    {Number(prod.price).toLocaleString()} {currency}
                  </div>
                  <div className="text-sm text-green-700 font-semibold">
                    {prod.quantity}
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => handleDeleteClick(e, prod.productId)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No products found for this category</p>
                </div>
              )}
            </div>

            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shopping;
