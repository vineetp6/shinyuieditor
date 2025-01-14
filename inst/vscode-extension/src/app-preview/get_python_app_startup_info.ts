import { getPathToPython } from "../Python-Utils/get_path_to_python";

import type { AppLocInfo, AppStartupInfo } from "./get_app_startup_info";

export async function getPythonAppStartupInfo({
  pathToApp,
  port,
  host,
}: AppLocInfo): Promise<AppStartupInfo> {
  const listen_for_ready_regex = new RegExp(
    `application startup complete.`,
    "i"
  );

  return {
    path_to_executable: await getPathToPython(),
    startup_cmds: [
      `-m`,
      `shiny`,
      `run`,
      `--port`,
      `${port}`,
      `--host`,
      host,
      `--reload`,
      pathToApp.replace(/([\\"])/g, "\\$1"),
    ],
    get_is_ready: (msg: string) => listen_for_ready_regex.test(msg),
  };
}

//  venv/bin/python -m shiny run --port 3333 --host 0.0.0.0 --reload "./scratch/python"
