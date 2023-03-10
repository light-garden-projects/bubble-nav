import { Page } from "../types/types";

// Recursive function to set the parent property of each page
// This makes a crazy circular object
// But it doesn't take up much memory
export const setParent = function (p: Page) {
  if (p.children !== undefined) {
    for (var i = 0; i < p.children.length; i++) {
      p.children[i].parentPage = p;
      setParent(p.children[i]);
    }
  }
};

export const setParents = function (siteMap: Page): Page {
  let pWithParents = { ...siteMap };
  setParent(pWithParents);
  return pWithParents;
};

// Get the current page, given the current URL
export const getCurrentPage = function (
  url: string,
  siteMap: Page
): Page | undefined {
  if (url === siteMap.url) return siteMap;
  for (var i = 0; i < siteMap.children.length; i++) {
    let child = siteMap.children[i];
    if (url === child.url) return child;
    else {
      let result = getCurrentPage(url, child);
      if (result !== undefined) return { ...result };
    }
  }
};

// Get siblings of the current page
export const getSiblings = function (currentPage: Page | undefined): Page[] {
  if (currentPage === undefined) return [];
  if (currentPage.parentPage === undefined) {
    return [];
  } else {
    const parentPage = currentPage.parentPage;
    const siblings = parentPage.children;
    return siblings.map((x) => ({ ...x }));
  }
};

// Get the parent of the current page
export const getParent = function (
  currentPage: Page | undefined
): Page | undefined {
  if (currentPage === undefined) return undefined;
  if (currentPage.parentPage === undefined) {
    return undefined;
  } else {
    return { ...currentPage.parentPage };
  }
};
