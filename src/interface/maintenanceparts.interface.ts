import { IItem } from "./item.interface";

export interface IMaintenanceParts {
  maintenancePart: number;
  serviceID: number;
  itemID: number;
  item: IItem;
  qty: number;
  createdDate: Date;
}
