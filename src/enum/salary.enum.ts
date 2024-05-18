export enum ESALARY_RANGE {
  LOW = 1,
  MID = 2,
  HIGH = 3,
}

export const SALARAY_RANGE = {
  [ESALARY_RANGE.LOW]: {
    low: 500,
    high: 1000,
    display: "500 - 1000",
    value: 1,
  },
  [ESALARY_RANGE.MID]: {
    low: 1000,
    high: 10000,
    display: "1000 - 10000",
    value: 2,
  },
  [ESALARY_RANGE.HIGH]: {
    low: 10000,
    high: 20000,
    display: "10000 - 20000",
    value: 3,
  },
};
