import React, { useEffect } from "react";
import useCart from "../hook/useCart";
import usePayment from "../hook/usePayment";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import { IoIosArrowBack } from "react-icons/io";
import useProduct from "../hook/useProduct";
import { BiSolidDiscount } from "react-icons/bi";
import PaymentButton from "./PaymentButton";

const Discount = () => {
  const { currency } = useProduct();
  const { accountId, token } = useAuth();
  const { selectedTotal, selectedCartItemsForDiscount } = useCart();
  const { shippingFee } = usePayment();
  const {
    discount,
    getDiscount,
    handleSelectDiscount,
    selectedDiscount,
    totalAfterDiscount,
    handleResetTotalAfterDiscount,
  } = usePayment();

  const handleGetDiscount = async () => {
    const res = await getDiscount(selectedCartItemsForDiscount);
    if (!res.success) {
      switch (res.status) {
        case 403:
          toast.error("Session expired, please login again");
          break;
        case 0:
          toast.error("Something went wrong, please login again");
          break;
        default:
          toast.error("Something went wrong, please login again");
          break;
      }
    }
  };

  useEffect(() => {
    handleResetTotalAfterDiscount(selectedTotal, selectedDiscount);
  }, [selectedDiscount, selectedTotal]);

  useEffect(() => {
    handleGetDiscount();
  }, [token, accountId]);

  return (
    <div className="w-full flex flex-col items-center justify-center mb-10">
      {/* Back to previous page */}
      <button
        onClick={() => window.history.back()}
        className="w-full flex flex-row justify-start items-center mb-5 caret-transparent cursor-pointer"
      >
        <IoIosArrowBack />
        <p className="text-sm sm:text-base md:text-xl ml-2">Back</p>
      </button>
      <hr className="w-full bg-gray-500 mb-5 caret-transparent" />

      {/* Title */}
      <div className="w-full flex flex-row items-center justify-start mb-10 gap-1 text-base sm:text-base md:text-xl caret-transparent">
        <BiSolidDiscount />
        <p>Discount</p>
      </div>

      {/* Promotion list */}
      <div className="w-3/4 flex flex-col items-center justify-center gap-4 mb-20">
        {discount.length > 0 ? (
          discount.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-row items-center justify-between gap-10 rounded-md border border-gray-300 p-4 hover:shadow-md bg-gray-50 transition-all duration-200"
            >
              <div className="flex w-full flex-row items-center justify-start gap-10 ">
                <img
                  src={assets.discount}
                  alt="discount image"
                  className="w-1/8 h-1/8 bg-white object-cover rounded-md border border-gray-200"
                />
                {/* Show discount here */}
                <p className="font-bold text-sm sm:text-base md:text-xl text-gray-700">
                  {item.name}
                </p>
              </div>

              {/* Selected checkbox */}
              <div className="basis-1/6 flex justify-center ">
                <input
                  className="w-5 h-5"
                  type="radio"
                  name="discountProgramSelection"
                  checked={
                    selectedDiscount
                      ? selectedDiscount.programId === item.programId
                      : false
                  }
                  onChange={() => {
                    handleSelectDiscount(item.programId);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="mb-10 caret-transparent flex flex-col items-center justify-center">
            <img src={assets.oops} alt="oops icon" className="w-1/4" />
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-500 mt-4">
              You don't have any discount!
            </p>
          </div>
        )}
      </div>

      {/* Total  */}
      <div className="w-3/4 flex flex-col items-center justify-between mb-10">
        <hr className="w-full bg-gray-500 mb-10 caret-transparent" />
        {/* Total */}
        <div className="w-full flex flex-row items-start justify-between mb-4">
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-800 font-semibold">
            Total
          </p>
          <div className="flex flex-col items-end gap-2">
            <p className="text-base sm:text-xl md:text-2xl text-gray-800">
              {Number(selectedTotal).toLocaleString()} {currency}
            </p>
            {selectedDiscount.value ? (
              selectedDiscount.value > 0 ? (
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                    + {Number(shippingFee).toLocaleString()} {currency}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                    -
                    {Number(
                      selectedDiscount.value * selectedTotal
                    ).toLocaleString()}
                    {currency}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                    + {Number(shippingFee).toLocaleString()} {currency}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                    - {Number(shippingFee).toLocaleString()} {currency}
                  </p>
                </div>
              )
            ) : (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                + {Number(shippingFee).toLocaleString()} {currency}
              </p>
            )}
            <hr className="w-full bg-gray-200 my-2" />
            <p className="text-base sm:text-xl md:text-2xl text-red-700 font-semibold">
              {Number(totalAfterDiscount).toLocaleString()} {currency}
            </p>
          </div>
        </div>
        <hr className="w-full bg-gray-500 mb-10 caret-transparent" />
      </div>
      {/* Navigate button */}
      <div className="w-full flex flex-row justify-end items-center mb-20">
        <PaymentButton />
      </div>
      {/* Footer */}
      <div className="w-full">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Discount;
