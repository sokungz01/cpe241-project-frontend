export const handleReportStatus = (statusID: number) => {
  const statusObj = {
    statusColor: "",
    statusTextColor: "",
    statusName: "",
  };
  switch (statusID) {
    case 1: {
      statusObj.statusColor = "bg-primary";
      statusObj.statusTextColor = "text-primary";
      statusObj.statusName = "รับคำร้อง";
      return statusObj;
    }
    case 2: {
      statusObj.statusColor = "bg-yellow-500";
      statusObj.statusTextColor = "text-yellow-500";
      statusObj.statusName = "อยู่ในระหว่างการซ่อม";
      return statusObj;
    }
    case 3: {
      statusObj.statusColor = "bg-green-500";
      statusObj.statusTextColor = "text-green-500";
      statusObj.statusName = "สำเร็จ";
      return statusObj;
    }
    case 4: {
      statusObj.statusColor = "bg-red-500";
      statusObj.statusTextColor = "text-red-500";
      statusObj.statusName = "ยกเลิกคำร้อง (โดยผู้ใช้)";
      return statusObj;
    }
    case 5: {
      statusObj.statusColor = "bg-red-500";
      statusObj.statusTextColor = "text-red-500";
      statusObj.statusName = "ปฏิเสธคำร้อง";
      return statusObj;
    }
    case 6: {
      statusObj.statusColor = "bg-unavailable";
      statusObj.statusTextColor = "text-unavailable";
      statusObj.statusName = "ไม่สามารถซ่อมได้";
      return statusObj;
    }
  }
};
