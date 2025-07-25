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
        default:
          toast.error("Something went wrong, please login again");
          break;
      }
    } else {
      if (!res.data || res.data.length === 0) {
        handleSelectDiscount(""); // auto reset if no discount
      }
    }
  };

  useEffect(() => {
    handleResetTotalAfterDiscount(selectedTotal, selectedDiscount);
  }, [selectedDiscount, selectedTotal]);

  useEffect(() => {
    handleGetDiscount();
  }, [token, accountId]);

  const hasDiscount =
    typeof selectedDiscount === "object" && selectedDiscount !== null;

  return (
    <div className="w-full flex flex-col items-center justify-center mb-10 px-4">
      {/* Back */}
      <button
        onClick={() => window.history.back()}
        className="w-full flex flex-row justify-start items-center mb-5 caret-transparent cursor-pointer"
      >
        <IoIosArrowBack />
        <p className="text-sm sm:text-base md:text-xl ml-2">Back</p>
      </button>
      <hr className="w-full bg-gray-300 mb-5 caret-transparent" />

      {/* Title */}
      <div className="w-full flex flex-row items-center justify-start mb-10 gap-2 text-xl font-semibold caret-transparent text-gray-800">
        <BiSolidDiscount />
        <p>Discount</p>
      </div>

      {/* Discount options */}
      <div className="w-full max-w-3xl flex flex-col items-center gap-4 mb-20">
        {/* No discount radio */}
        <div className="w-full flex justify-between items-center gap-6 rounded-md border border-gray-300 p-4 bg-white hover:shadow-md transition">
          <div className="flex flex-row items-center gap-6">
            <img
              src={assets.discount}
              alt="no-discount"
              className="w-12 h-12 object-cover rounded border border-gray-200 opacity-30"
            />
            <p className="text-lg font-medium text-gray-500 italic">
              No Discount Program
            </p>
          </div>
          <input
            className="w-5 h-5"
            type="radio"
            name="discountProgramSelection"
            checked={selectedDiscount === ""}
            onChange={() => handleSelectDiscount("")}
          />
        </div>

        {discount.length > 0 ? (
          discount.map((item, index) => (
            <div
              key={index}
              className="w-full flex justify-between items-center gap-6 rounded-md border border-gray-300 p-4 hover:shadow-md bg-gray-50 transition"
            >
              <div className="flex flex-row items-center gap-6">
                <img
                  src={assets.discount}
                  alt="discount"
                  className="w-12 h-12 object-cover rounded border border-gray-200"
                />
                <p className="text-lg font-medium text-gray-700">{item.name}</p>
              </div>
              <input
                className="w-5 h-5"
                type="radio"
                name="discountProgramSelection"
                checked={
                  typeof selectedDiscount === "object" &&
                  selectedDiscount?.programId === item.programId
                }
                onChange={() => handleSelectDiscount(item.programId)}
              />
            </div>
          ))
        ) : (
          <div className="mb-10 flex flex-col items-center">
            <img src={assets.oops} alt="oops" className="w-40" />
            <p className="text-xl text-gray-500 mt-4">
              You don't have any discount!
            </p>
          </div>
        )}
      </div>

      {/* Total Summary */}
      <div className="w-full max-w-3xl flex flex-col items-end gap-4 mb-12">
        <hr className="w-full bg-gray-200" />
        <div className="w-full flex justify-between mb-1">
          <span className="text-xl font-semibold text-gray-700">Total</span>
          <span className="text-lg text-gray-800">
            {Number(selectedTotal).toLocaleString()} {currency}
          </span>
        </div>

        {/* Discount/Shipping Breakdown */}
        {hasDiscount ? (
          selectedDiscount.value > 0 ? (
            <>
              <div className="flex justify-between w-full text-base text-gray-500">
                <span>Shipping fee</span>
                <span>
                  + {Number(shippingFee).toLocaleString()} {currency}
                </span>
              </div>
              <div className="flex justify-between w-full text-base text-gray-500">
                <span>Discount</span>
                <span>
                  -{" "}
                  {Number(
                    selectedDiscount.value * selectedTotal
                  ).toLocaleString()}{" "}
                  {currency}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between w-full text-base text-gray-500">
                <span>Shipping fee</span>
                <span>
                  + {Number(shippingFee).toLocaleString()} {currency}
                </span>
              </div>
              <div className="flex justify-between w-full text-base text-gray-500">
                <span>Discount</span>
                <span>
                  - {Number(shippingFee).toLocaleString()} {currency}
                </span>
              </div>
            </>
          )
        ) : (
          <div className="flex justify-between w-full text-base text-gray-500">
            <span>Shipping fee</span>
            <span>
              + {Number(shippingFee).toLocaleString()} {currency}
            </span>
          </div>
        )}

        <hr className="w-full bg-gray-200 my-2" />

        <div className="flex justify-between w-full text-2xl font-bold text-red-700">
          <span>Total after discount</span>
          <span>
            {Number(totalAfterDiscount).toLocaleString()} {currency}
          </span>
        </div>
        <hr className="w-full bg-gray-300" />
      </div>

      {/* Payment */}
      <div className="w-full max-w-3xl flex justify-end mb-20">
        <PaymentButton />
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Discount;
