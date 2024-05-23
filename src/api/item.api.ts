import { IItem } from "@/interface/item.interface";
import { axiosInstance } from "./axiosInstance";

export async function GetAllItem() {
  const result = await axiosInstance.get("/item");
  return result;
}

export async function GetItemByID(itemID: number) {
  if (!itemID || Number(itemID) === 0) throw new Error("Error! invalid itemID");
  const result = await axiosInstance.get(`/item/${itemID}`);
  return result;
}

export async function CreateItem(values: IItem) {
  const result = await axiosInstance.post(`/item/`, values);
  return result;
}

export async function UpdateItem(itemID: number, values: IItem) {
  if (!itemID || Number(itemID) === 0) throw new Error("Error! invalid itemID");
  const result = await axiosInstance.put(`/item/${itemID}`, values);
  return result;
}

export async function DeleteItem(itemID: number) {
  if (!itemID || Number(itemID) === 0) throw new Error("Error! invalid itemID");
  const result = await axiosInstance.delete(`/item/${itemID}`);
  return result;
}
