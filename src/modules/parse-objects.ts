import { Page } from "../types/types";

// Recursive function to set the parent property of each page
export const setParent = function (p: Page) {
  if (p.children !== undefined) {
    for (var i = 0; i < p.children.length; i++) {
      p.children[i].parent = p;
      setParent(p.children[i]);
    }
  }
};

export const setParents = function (p: Page): Page {
  let pWithParents = { ...p };
  setParent(pWithParents);
  return pWithParents;
};
