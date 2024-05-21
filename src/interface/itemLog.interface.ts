import { IEmployee } from "./employee.interface";
import { IItem } from "./item.interface";

export interface IItemLog {
  itemLogID: number;
  itemID: number;
  staffID: number;
  qty: number;
  isAdd: boolean;
  createDate: Date;
  item: IItem;
  staff: IEmployee;
}
