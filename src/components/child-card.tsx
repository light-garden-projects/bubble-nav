import { Page } from "../types/types";

type ChildCardProps = {
  page: Page;
  onClick: (url: string) => void;
};

export const ChildCard = ({ page, onClick }: ChildCardProps) => {
  return (
    <button
      onClick={() => {
        onClick(page.url);
      }}
      style={{
        width: "100%",
        backgroundColor: "white",
        cursor: "pointer",
        border: "1px solid #ccc",
        marginBottom: "5px",
      }}
    >
      <p>{page.title}</p>
    </button>
  );
};
