export type Page = {
  title: string;
  url: string;
  backgroundImage?: string;
  isHomePage?: boolean;
  children: Page[];
  parentPage?: Page;
  themeColor?: string;
};

export type Point = [number, number];
