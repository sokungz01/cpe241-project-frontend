export const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export function convertDateToString(date: Date) {
  const newDate = new Date(date);
  const day =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  const month =
    newDate.getMonth() + 1 < 10
      ? "0" + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return day + "-" + month + "-" + year;
}
