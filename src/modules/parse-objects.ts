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

// Get all the ancestors of the current page
export const getAncestors = function (currentPage: Page | undefined): Page[] {
  if (currentPage === undefined) return [];
  if (currentPage.parentPage === undefined) {
    return [];
  } else {
    const parentPage = currentPage.parentPage;
    const ancestors = getAncestors(parentPage);
    return [parentPage, ...ancestors];
  }
};

export const getTheme = function (
  currentPage: Page | undefined,
  startIndex = 0
): { color: string; level: number } {
  // No theme
  if (currentPage === undefined) return { color: "red", level: 0 };
  // No parent page, no theme
  if (!currentPage.parentPage && !currentPage.theme)
    return { color: "red", level: 0 };
  // Else return the theme recursively
  if (currentPage.theme) {
    return { color: currentPage.theme, level: startIndex };
  } else {
    return getTheme(currentPage.parentPage, startIndex + 1);
  }
};

// Function to darken or lighten a hex color by a given percentage
export function shadeHexColor(color: string, percent: number) {
  var f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return (
    "#" +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
}
