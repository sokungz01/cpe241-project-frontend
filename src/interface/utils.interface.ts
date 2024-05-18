export interface Option {
  label: string;
  value: string;
  disabled ?: boolean;
}

export interface Filter {
  search: string;
  positionID: number;
  range: number;
}
