import React from "react";
import useSupport from "../hook/useSupport";
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SupportForm = () => {
  const { handleAddSupport } = useSupport();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const handleSummitForm = async (comment) => {
    const res = await handleAddSupport(comment);
    if (res.success) {
      toast.success("Your request was sent !");
      console.log("Profile updated:", comment);
    } else {
      switch (res.status) {
        case 400:
          toast.error("Invalid request data. Please check your input.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSummitForm)}
      className="w-full flex flex-col justify-center items-center"
    >
      <div className="w-full max-h-[200px] flex flex-col justify-start gap-2">
        <label
          htmlFor="comment"
          className="font-semibold w-full bg-[#F4F4F4] p-2 mb-2"
        >
          Support Message
        </label>
        <textarea
          id="comment"
          {...register("comment", {
            required: "This field is required!",
            minLength: {
              value: 8,
              message: "Message must be at least 8 characters.",
            },
            maxLength: {
              value: 500,
              message: "Message must be less than 500 characters.",
            },
          })}
          placeholder="Please describe any problems you have or any help you need."
          className="h-[150px] max-h-[150px] border border-gray-500 p-2 rounded resize-none overflow-y-auto"
        />
        <p className="text-sm text-gray-500 text-right">
          {watch("comment")?.length || 0}/500 characters
        </p>
        {errors.comment && (
          <span className="text-red-500 text-sm mb-5">
            {errors.comment.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-black text-white rounded-md flex flex-row items-center justify-center gap-2"
      >
        {isSubmitting ? "Send..." : "Send"} <IoMdSend />
      </button>
    </form>
  );
};

export default SupportForm;
