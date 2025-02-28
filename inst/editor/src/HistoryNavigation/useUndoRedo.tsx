import React from "react";

import { useDispatch } from "react-redux";

import StateHistory from "../HistoryNavigation/StateHistory";
import type { MainStateOption } from "../state/app_info";
import { SET_FULL_STATE } from "../state/app_info";
import type { RootState } from "../state/store";
import { uiTreesAreSame } from "../state/uiTreesAreSame";

type HistoryEntry = MainStateOption;

export type HistoryInfo = {
  goBackward: () => void;
  goForward: () => void;
  canGoBackward: boolean;
  canGoForward: boolean;
};
export function useUndoRedo(state: RootState["app_info"]): HistoryInfo {
  const dispatch = useDispatch();

  const [canGoForward, setCanGoForward] = React.useState(false);

  const [canGoBackward, setCanGoBackward] = React.useState(false);
  const stateHistory = React.useRef<StateHistory<HistoryEntry>>(
    new StateHistory({ comparisonFn: sameHistoryEntry })
  );

  React.useEffect(() => {
    // Ignore the initialization state
    if (!state || state.mode === "LOADING") return;

    const history = stateHistory.current;

    // Send latest layout to the history
    history.addEntry(state);

    // Make sure back and forward buttons are properly enabled or disabled
    setCanGoBackward(history.canGoBackwards());
    setCanGoForward(history.canGoForwards());
  }, [state]);

  const setState = React.useCallback(
    (updatedState: HistoryEntry) => {
      dispatch(SET_FULL_STATE({ state: updatedState }));
    },
    [dispatch]
  );
  const goBackward = React.useCallback(() => {
    try {
      setState(stateHistory.current.goBackwards());
    } catch (e) {
      // Failed to go backwards. Probably at the begining of the state stack.
    }
  }, [setState]);

  const goForward = React.useCallback(() => {
    try {
      setState(stateHistory.current.goForwards());
    } catch (e) {
      // Failed to go forwards. Probably at at top of state stack
    }
  }, [setState]);

  return {
    goBackward,
    goForward,
    canGoBackward,
    canGoForward,
  };
}

function sameHistoryEntry(newEntry: HistoryEntry, oldEntry?: HistoryEntry) {
  if (typeof oldEntry === "undefined") return false;

  if (oldEntry.mode === "LOADING" && newEntry.mode === "LOADING") {
    return true;
  }

  if (
    oldEntry.mode === "TEMPLATE_CHOOSER" &&
    newEntry.mode === "TEMPLATE_CHOOSER"
  ) {
    return (
      JSON.stringify(oldEntry.options) === JSON.stringify(newEntry.options)
    );
  }

  if (newEntry.mode === "MAIN" && oldEntry.mode === "MAIN") {
    return uiTreesAreSame(oldEntry.ui_tree, newEntry.ui_tree);
  }

  return false;
}
