import { IItemCategory } from "@/interface/itemCategory.interface";
import { axiosInstance } from "./axiosInstance";

export async function GetALlItemCategory() {
  const result = await axiosInstance.get("/itemCategory");
  return result;
}

export async function GetItemCategoryByID(id: number) {
  if (!id || Number(id) === 0)
    throw new Error("Error! Invalid ItemCategory id");
  const result = await axiosInstance.get(`/itemCategory/${id}`);
  return result;
}

export async function CreateItemCategory(values: IItemCategory) {
  const result = await axiosInstance.post(`/itemCategory/`, values);
  return result;
}

export async function UpdateItemCategory(id: number, values: IItemCategory) {
  if (!id || Number(id) === 0)
    throw new Error("Error! Invalid ItemCategory id");
  const result = await axiosInstance.put(`/itemCategory/${id}`, values);
  return result;
}

export async function DeleteItemCategory(id: number) {
  if (!id || Number(id) === 0)
    throw new Error("Error! Invalid ItemCategory id");
  const result = await axiosInstance.delete(`/itemCategory/${id}`);
  return result;
}
