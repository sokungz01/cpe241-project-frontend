import { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    colorPrimary: "#0174BE",
    colorInfo: "#142074",
    colorTextBase: "#000000",
    colorLink: "#142074",
    colorError: "#ff503e",
    colorWarning: "#ffc041",
    colorSuccess: "#77de44",
    fontSize: 16,
    fontFamily: "Kanit",
  },
  components: {
    Select: {
      optionFontSize: 14,
      fontSize: 14,
    },
    Form: {
      verticalLabelPadding: 0,
      itemMarginBottom: 4,
    },
    Table: {
      cellFontSize: 15,
    },
    DatePicker: {
      fontSize: 14,
    },
  },
};
