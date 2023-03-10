export type Page = {
  title: string;
  url: string;
  backgroundImage?: string;
  isHomePage?: boolean;
  children: Page[];
  parent?: Page;
};

export type Point = [number, number];
