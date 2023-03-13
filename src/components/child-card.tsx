import { getTheme } from "../modules/parse-objects";
import { Page } from "../types/types";
import { AngleRight } from "./icons";

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
        backgroundColor: themeColor,
        cursor: "pointer",
        border: `none`,
        marginBottom: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ width: 18, height: 18 }}></div>
      <p className="child-card__page-label">{page.title}</p>
      <AngleRight color={"white"} size={18} />
    </button>
  );
};
