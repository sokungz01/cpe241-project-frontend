export const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
