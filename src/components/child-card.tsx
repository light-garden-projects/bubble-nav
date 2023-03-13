import { getTheme } from "../modules/parse-objects";
import { Page } from "../types/types";
import { ArrowRightCircle } from "./icons";

type ChildCardProps = {
  page: Page;
  onClick: (url: string) => void;
};

export const ChildCard = ({ page, onClick }: ChildCardProps) => {
  const theme = getTheme(page);
  const { color: themeColor } = theme;
  return (
    <button
      onClick={() => {
        onClick(page.url);
      }}
      style={{
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        cursor: "pointer",
        border: `none`,
        marginBottom: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ width: 24, height: 24 }}></div>
      <p style={{ color: themeColor }}>{page.title}</p>
      <ArrowRightCircle color={themeColor} size={24} />
    </button>
  );
};
