export type Page = {
  title: string;
  titleLine1?: string;
  titleLine2?: string;
  url: string;
  backgroundImage?: string;
  isHomePage?: boolean;
  children: Page[];
  parentPage?: Page;
  themeColor?: string;
};

export type Point = [number, number];
