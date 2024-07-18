import {
  provinces,
  cities,
  barangays,
  regionByCode,
} from "select-philippines-address";

export const getAddressEntityNames = async (
  barangayCode: string,
  cityMunicipalityCode: string,
  provinceCode: string,
  regionCode: string
) => {
  const region = await regionByCode(regionCode);
  const province = (await provinces(regionCode)).find(
    (province) => province.province_code === provinceCode
  );
  const city = (await cities(provinceCode)).find(
    (city) => city.city_code === cityMunicipalityCode
  );
  const barangay = (await barangays(cityMunicipalityCode)).find(
    (barangay) => barangay.brgy_code === barangayCode
  );

  return {
    barangay: barangay?.brgy_name,
    city: city?.city_name,
    province: province?.province_name,
    region: region.region_name,
  };
};
