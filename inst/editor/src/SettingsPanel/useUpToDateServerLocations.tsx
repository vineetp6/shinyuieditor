import React from "react";

import { useTsParser } from "../EditorContainer/TSParserProvider";
import type { ParsedAppServerNodes } from "../parsing/ParsedAppInfo";
import { getPythonServerLocations } from "../python-parsing/parsePythonApp";
import { getRServerLocations } from "../r-parsing/parseRApp";
import { useCurrentAppInfo } from "../state/app_info";
import { generateFullAppScript } from "../ui-node-definitions/code_generation/generate_full_app_script";

/**
 * Hook to get the current parser nodes corresponding to input and output nodes
 * in the app script.
 * @returns The current server nodes if the app is in server aware mode, null
 * otherwise
 */
export function useCurrentServerNodes() {
  const current_app_info = useCurrentAppInfo();
  const parseApp = useTsParser();

  const [serverNodes, setServerNodes] =
    React.useState<ParsedAppServerNodes | null>(null);

  React.useEffect(() => {
    if (current_app_info.mode !== "MAIN") return;

    // Because treesitter is so fast, we just regenerate the whole app script
    // here and reparse that generated script. This takes way less time than you
    // would expect.
    // - Pitfalls:
    //   - If the user has unsaved changes, this will not reflect those changes
    //   - If a formatter was used, this will be unaware of it and give bad
    //     positions
    // - Potential Improvements:
    //   - Offload this logic to the main dispatch system and just reparse the
    //     app on every change as that's what this already does
    const app_script = generateFullAppScript(current_app_info);

    parseApp(app_script).then((info) => {
      const server_locations =
        current_app_info.language === "R"
          ? getRServerLocations(info.server_node)
          : getPythonServerLocations(info.server_node);

      if (!server_locations) {
        throw new Error("Could not parse app scripts");
      }

      setServerNodes(server_locations);
    });
  }, [current_app_info, parseApp]);

  return serverNodes;
}
