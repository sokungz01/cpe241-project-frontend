import Swal from "sweetalert2";

export function SwalSuccess(title: string, description: string) {
  return Swal.fire({
    title: title,
    text: description,
    icon: "success",
    timer: 2000
  });
}

export function SwalError(title: string, description: string) {
    return Swal.fire({
      title: title,
      text: description,
      icon: "error",
      timer: 2000
    });
  }
