export interface IInventoryAnalysis {
  Date: Date | string;
  categoryName: string;
  totalAdded: number;
  totalRemoved: number;
}

export interface IMachineTypeErrorAnylysis {
  machineTypeName: string;
  totalServiceRequests: number;
  requestDate: Date | string;
}

export interface IEmployeeEngagementAnalysis {
  employeeID: number;
  name: string;
  surname: string;
  maintenanceCount: number;
  totalInventoryUsed: number;
  inventoryItemsUsed: number;
}

export interface MaintenanceCostAnlysis {
  errorName: string;
  errorCount: number;
  totalMaintenanceCost: number;
}
