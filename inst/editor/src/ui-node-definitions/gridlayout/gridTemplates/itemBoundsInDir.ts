import type { TractDirection } from "util-functions/src/matrix-helpers";

import type { ItemLocation } from "./types";

export function itemBoundsInDir(item: ItemLocation, dir: TractDirection) {
  switch (dir) {
    case "rows":
      return {
        itemStart: item.rowStart,
        itemEnd: item.rowStart + item.rowSpan - 1,
      };
    case "cols":
      return {
        itemStart: item.colStart,
        itemEnd: item.colStart + item.colSpan - 1,
      };
  }
}
