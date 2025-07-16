import { useState, useEffect } from "react";
import Category, { categories } from "../components/Category";
import ProductItem from "../components/ProductItem";
import allProductAPI from "../api/allProductAPI";
import Pagination from "../components/Pagination";
import { assets } from "../assets/assets";
import CarouselDefault from "../components/CarouselDefault";
import Footer from "../components/Footer";

const Shopping = () => {
  const [id, setId] = useState(categories[0].id);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  const carouselImg = [assets.pro1, assets.pro2, assets.pro3, assets.pro4];

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

  useEffect(() => {
    setPage(1);
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col">
      <hr className="w-full bg-gray-500 mb-10" />

      <div className="w-full mb-20">
        {/* Banner for promotion */}
        <div className="w-full sm:flex flex-row justify-between items-center h-48 sm:h-64 md:h-72 lg:h-80 gap-x-4 mb-10">
          {/* Carousel (left) */}
          <div className="w-full sm:w-2/3 h-full">
            <CarouselDefault images={carouselImg} />
          </div>
          {/* Stacked images (right) */}
          <div className="w-1/3 hidden sm:flex flex-col justify-between h-full">
            <img
              src={assets.pro6}
              alt="pro6"
              className="h-9/19 w-full object-cover rounded-xl"
            />
            <img
              src={assets.pro7}
              alt="pro7"
              className="h-9/19 w-full object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="w-full">
          {/* Filter Block */}
          <div></div>
          {/* Product Block */}
          <div>
            <Category selected={id} onChange={setId} />
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {products.map((prod) => (
                <ProductItem
                  key={prod.productId}
                  productId={prod.productId}
                  name={prod.name}
                  price={prod.price}
                  image={prod.images}
                />
              ))}
            </div>
            {products.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No products found for this category</p>
              </div>
            )}
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
