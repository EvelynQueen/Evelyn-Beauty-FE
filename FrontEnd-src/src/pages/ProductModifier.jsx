import { useState, useEffect } from "react";
import { categories } from "../components/Category";
import allProductAPI from "../api/allProductAPI";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import CategoryStaff from "../components/CategoryStaff";
import { Navigate, useNavigate } from "react-router-dom";
import useProduct from "../hook/useProduct";

const Shopping = () => {
  const [id, setId] = useState(categories[0].id);
  const { currency } = useProduct();
  const [products, setProducts] = useState([]);
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
  }, [id, page]);

  const handleOnclick = (productId) => {
    navigate(`/product-modifier/${productId}`);
  };

  useEffect(() => {
    setPage(1);
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col caret-transparent px-10">
      <div className="w-full mb-20">
        <div className="w-full">
          {/* Product Block */}
          <div>
            <CategoryStaff selected={id} onChange={setId} />
            <div className="w-full mt-4 space-y-4">
              {/* Header row */}
              <div className="hidden sm:grid grid-cols-5 font-semibold text-gray-600 px-4 py-3 text-center border-b border-gray-200">
                <span>Image</span>
                <span>Brand</span>
                <span>Product</span>
                <span>Price</span>
                <span>Stock</span>
              </div>

              {products.map((prod) => (
                <div
                  key={prod.productId}
                  onClick={() => handleOnclick(prod.productId)}
                  className="cursor-pointer grid grid-cols-1 sm:grid-cols-5 items-center bg-[#FFFAFA] hover:shadow-md rounded-xl px-4 py-3 border border-gray-200 text-center gap-6 sm:gap-4"
                >
                  {/* Image */}
                  <div className="flex justify-center">
                    <img
                      src={prod.images?.[0] || "/placeholder.png"}
                      alt={prod.name}
                      className="w-28 h-28 rounded-xl object-cover border"
                    />
                  </div>

                  {/* Brand */}
                  <div className="text-sm text-gray-700">
                    {prod.brand || "N/A"}
                  </div>

                  {/* Product Name */}
                  <div className="text-base font-medium text-blue-800">
                    {prod.name}
                  </div>

                  {/* Price */}
                  <div className="text-sm text-red-700 font-semibold">
                    {Number(prod.price).toLocaleString()} {currency}
                  </div>

                  {/* Stock */}
                  <div className="text-sm text-green-700 font-semibold">
                    {prod.quantity}
                  </div>
                </div>
              ))}

              {/* No product case */}
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
