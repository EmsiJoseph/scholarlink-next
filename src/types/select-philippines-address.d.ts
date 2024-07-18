// src/types/select-philippines-address.d.ts

declare module "select-philippines-address" {
  export interface Region {
    id: number;
    psgc_code: string;
    region_code: string;
    region_name: string;
  }

  export interface Province {
    id: number;
    psgc_code: string;
    province_code: string;
    province_name: string;
    region_code: string;
  }

  export interface City {
    id: number;
    psgc_code: string;
    city_code: string;
    city_name: string;
    province_code: string;
  }

  export interface Barangay {
    id: number;
    psgc_code: string;
    brgy_code: string;
    brgy_name: string;
    city_code: string;
  }

  export function regions(): Promise<Region[]>;
  export function provinces(regionCode: string): Promise<Province[]>;
  export function cities(provinceCode: string): Promise<City[]>;
  export function barangays(cityCode: string): Promise<Barangay[]>;
  export function regionByCode(regionCode: string): Promise<Region>;
}
