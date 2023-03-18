import { getTheme } from "../modules/parse-objects";
import { Page } from "../types/types";
import { AngleLeft, AngleRight } from "./icons";

type ChildCardProps = {
  page: Page;
  onClick: (url: string) => void;
  themeOverride?: string;
  type?: "parent" | "child";
};

export const ParentOrChildCard = ({
  page,
  themeOverride,
  onClick,
  type = "child",
}: ChildCardProps) => {
  const theme = getTheme(page);
  const { color } = theme;
  const themeColor = themeOverride ? themeOverride : color;

  return (
    <a
      href={page.url}
      className="child-card__button"
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
        padding: 10,
        boxSizing: "border-box",
        textDecoration: "none",
        color: "white",
      }}
    >
      {type === "parent" && <AngleLeft color={"white"} size={16} />}
      {type === "child" && <div style={{ width: 16, height: 16 }} />}
      <span
        style={{
          display: "block",
        }}
        className="child-card__page-label"
      >
        {page.title}
      </span>
      {type === "child" && <AngleRight color={"white"} size={16} />}
      {type === "parent" && <div style={{ width: 16, height: 16 }} />}
    </a>
  );
};
