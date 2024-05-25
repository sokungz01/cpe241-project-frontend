export interface IItem {
  itemID: number;
  itemCategoryID: number;
  itemName: string;
  itemCost: number;
  qty: number;
  staffID: number;
}

export const initialItem = {
  itemID: 0,
  itemCategoryID: 0,
  itemName: "string",
  itemCost: 0,
  qty: 0,
  staffID: 0,
};
