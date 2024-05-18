export interface IMachine {
  machineID: number;
  machineName: string;
  machineBrand: string;
  machineTypeID: number;
  startDate: Date;
  endDate: {
    Time: Date;
    Valid: boolean;
  };
  desc: string;
  status: number;
}
