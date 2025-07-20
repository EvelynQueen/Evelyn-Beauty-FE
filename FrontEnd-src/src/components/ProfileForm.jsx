import { useEffect } from "react";
import useLocation from "../hook/useLocation";
import { useForm, useWatch } from "react-hook-form";
import useProfile from "../hook/useProfile";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const {
    provinces,
    districts,
    wards,
    getProvinces,
    getDistricts,
    getWards,
    setDetailAddress,
  } = useLocation();

  const {
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    handleUpdateProfile,
    handleSetFullAddress,
    fullAddress,
  } = useProfile();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    setValue("name", name);
    setValue("phone", phoneNumber);
  }, [name, phoneNumber, setValue]);

  const selectedProvinceId = useWatch({ control, name: "province" });
  const selectedDistrictId = useWatch({ control, name: "district" });
  const selectedWardCode = useWatch({ control, name: "ward" });
  const detailAddress = useWatch({ control, name: "address" });

  const selectedProvince = provinces.find(
    (p) => p.ProvinceID === Number(selectedProvinceId)
  );
  const selectedDistrict = districts.find(
    (d) => d.DistrictID === Number(selectedDistrictId)
  );

  const selectedWard = wards.find(
    (w) => w.WardCode === String(selectedWardCode)
  );

  useEffect(() => {
    if (selectedProvince?.ProvinceID) {
      getDistricts(selectedProvince.ProvinceID);
      setValue("district", "");
      setValue("ward", "");
    }
  }, [selectedProvinceId]);

  useEffect(() => {
    if (selectedDistrict?.DistrictID) {
      getWards(selectedDistrict.DistrictID);
      setValue("ward", "");
    }
  }, [selectedDistrictId]);

  const setFullAddressHandler = (address, ward, district, province) => {
    handleSetFullAddress(address, ward, district, province);
  };
  useEffect(() => {
    setFullAddressHandler(
      detailAddress,
      selectedWard?.WardName,
      selectedDistrict?.DistrictName,
      selectedProvince?.ProvinceName
    );
  }, [detailAddress, selectedWardCode, selectedDistrictId, selectedProvinceId]);

  const handleSubmitForm = async (data) => {
    const profile = {
      name: data.name,
      phone: data.phone,
      address: fullAddress,
    };
    console.log("Submitting profile:", profile);
    const res = await handleUpdateProfile(profile);
    if (res.success) {
      toast.success("Profile updated successfully!");
      setName(data.name);
      setPhoneNumber(data.phone);
      console.log("Profile updated:", profile);
    } else {
      switch (res.status) {
        case 400:
          toast.error("Invalid profile data. Please check your input.");
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
      onSubmit={handleSubmit(handleSubmitForm)}
      className="w-full flex flex-col items-center justify-center gap-4 mb-10"
    >
      {/* Name */}
      <div className="w-full flex flex-col items-start">
        <label htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
            onChange: (e) => {
              setName(e.target.value);
              setValue("name", e.target.value);
            },
          })}
          placeholder="Enter your name"
          className="w-full border p-2 rounded-sm"
        />
        {errors.name && (
          <p className="text-left text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="w-full flex flex-col items-start">
        <label htmlFor="phone">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^(0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/,
              message: "Invalid Vietnamese phone number",
            },
            onChange: (e) => {
              setPhoneNumber(e.target.value);
              setValue("phone", e.target.value);
            },
          })}
          placeholder="Enter your phone number"
          className="w-full border p-2 rounded-sm"
        />
        {errors.phone && (
          <p className="text-left text-red-500 text-sm mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Province */}
      <div className="w-full flex flex-col items-start">
        <label htmlFor="province">
          Province <span className="text-red-500">*</span>
        </label>
        <select
          id="province"
          {...register("province", { required: "Province is required" })}
          className="w-full border p-2 rounded-sm"
        >
          <option value="">-- Choose Province --</option>
          {provinces.map((p) => (
            <option key={p.ProvinceID} value={p.ProvinceID}>
              {p.ProvinceName}
            </option>
          ))}
        </select>
        {errors.province && (
          <p className="text-left text-red-500 text-sm mt-1">
            {errors.province.message}
          </p>
        )}
      </div>

      {/* District */}
      <div className="w-full flex flex-col items-start">
        <label htmlFor="district">
          District <span className="text-red-500">*</span>
        </label>
        <select
          id="district"
          {...register("district", { required: "District is required" })}
          className="w-full border p-2 rounded-sm"
        >
          <option value="">-- Choose District --</option>
          {districts.map((d) => (
            <option key={d.DistrictID} value={d.DistrictID}>
              {d.DistrictName}
            </option>
          ))}
        </select>
        {errors.district && (
          <p className="text-left text-red-500 text-sm mt-1">
            {errors.district.message}
          </p>
        )}
      </div>

      {/* Ward */}
      <div className="w-full flex flex-col items-start">
        <label htmlFor="ward">
          Ward <span className="text-red-500">*</span>
        </label>
        <select
          id="ward"
          {...register("ward", { required: "Ward is required" })}
          className="w-full border p-2 rounded-sm"
        >
          <option value="">-- Choose Ward --</option>
          {wards.map((w) => (
            <option key={w.WardCode} value={w.WardCode}>
              {w.WardName}
            </option>
          ))}
        </select>
        {errors.ward && (
          <p className="text-left text-red-500 text-sm mt-1">
            {errors.ward.message}
          </p>
        )}
      </div>

      {/* Detail Address */}
      <div className="w-full flex flex-col items-start">
        <label htmlFor="address">
          Detail Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="address"
          placeholder="Street, Apartment, etc."
          {...register("address", {
            required: "Address is required",
            onChange: (e) => setDetailAddress(e.target.value),
          })}
          className="w-full border p-2 rounded-sm"
        />
        {errors.address && (
          <p className="text-left text-red-500 text-sm mt-1">
            {errors.address.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        id="create-profile"
        className="w-1/3 bg-black text-white px-4 py-2 rounded-md hover:scale-105 hover:bg-gray-800 transition-all duration-200 mt-4"
      >
        {isSubmitting ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
