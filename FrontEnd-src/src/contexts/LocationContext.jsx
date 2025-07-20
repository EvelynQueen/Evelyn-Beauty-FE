import { createContext, useState, useMemo } from "react";
import {
  getDistrictAPI,
  getProvincesAPI,
  getWardsAPI,
} from "../api/getProfileAPI";

export const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardId, setWardId] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  // API calls
  const getProvinces = async () => {
    const res = await getProvincesAPI();
    setProvinces(res);
  };

  const getDistricts = async (provinceId) => {
    const res = await getDistrictAPI(provinceId);
    setDistricts(res);
  };

  const getWards = async (districtId) => {
    const res = await getWardsAPI(districtId);
    setWards(res);
  };

  // Lookup selected object from ID
  const selectedProvince = useMemo(() => {
    return provinces.find((p) => p.ProvinceID === provinceId);
  }, [provinceId, provinces]);

  const selectedDistrict = useMemo(() => {
    return districts.find((d) => d.DistrictID === districtId);
  }, [districtId, districts]);

  const selectedWard = useMemo(() => {
    return wards.find((w) => w.WardCode === wardId);
  }, [wardId, wards]);

  const fullAddress = useMemo(() => {
    if (
      detailAddress &&
      selectedWard?.WardName &&
      selectedDistrict?.DistrictName &&
      selectedProvince?.ProvinceName
    ) {
      return `${detailAddress}, ${selectedWard.WardName}, ${selectedDistrict.DistrictName}, ${selectedProvince.ProvinceName}`;
    }
    return "";
  }, [detailAddress, selectedProvince, selectedDistrict, selectedWard]);

  const value = {
    provinces,
    districts,
    wards,
    getProvinces,
    getDistricts,
    getWards,
    setProvinces,
    setDistricts,
    setWards,
    provinceId,
    districtId,
    wardId,
    setProvinceId,
    setDistrictId,
    setWardId,
    detailAddress,
    setDetailAddress,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    fullAddress,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
