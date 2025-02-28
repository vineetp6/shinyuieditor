import type {
  BackendConnection,
  MessageToClient,
  MessageToBackend,
  MessageDispatcher,
} from "communication-types";

type BackendMessage = { path: string; payload?: string | object };

export function setupWebsocketBackend({
  onClose,
  messageDispatch,
  pathToWebsocket = window.location.host + window.location.pathname,
}: {
  onClose: () => void;
  messageDispatch: MessageDispatcher;
  pathToWebsocket?: string;
}) {
  let connectedToWebsocket = false;

  return new Promise<BackendConnection | "NO-WS-CONNECTION">((resolve) => {
    try {
      if (!document.location.host) throw new Error("Not on a served site!");

      const ws = new WebSocket(buildWebsocketPathFromDomain(pathToWebsocket));

      const messagePassingMethods: BackendConnection = {
        sendMsg: (msg) => {
          sendWsMessage(ws, msg as MessageToBackend);
        },
        incomingMsgs: messageDispatch,
        mode: "HTTPUV",
      };

      ws.onerror = (e) => {
        resolve("NO-WS-CONNECTION");
      };

      ws.onopen = (event) => {
        listenForWsMessages(ws, (msg: BackendMessage) => {
          const { path, payload } = msg as MessageToClient;
          messageDispatch.dispatch(path, payload);
        });
        resolve(messagePassingMethods);
        connectedToWebsocket = true;
      };

      ws.onclose = (event) => {
        if (connectedToWebsocket) {
          onClose();
          messageDispatch.dispatch("CONNECTION-LOST", {
            msg: "Websocket connection closed",
          });
        } else {
          resolve("NO-WS-CONNECTION");
        }
      };
    } catch (e) {
      resolve("NO-WS-CONNECTION");
    }
  });
}

function buildWebsocketPathFromDomain(domain: string) {
  // If we're in dev mode the app itself will be hosted on the dev server which
  // is not where the websocket communication happens. In this situation we rely
  // on the backend of the ui editor to be running on port `8888` of localhost.

  // The type of the websocket protocol will change depending on if we're on a
  // http (typically localhost) or https (something like workbench)
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

  return protocol + "//" + domain;
}

function sendWsMessage(ws: WebSocket, msg: MessageToBackend) {
  const msg_blob = new Blob([JSON.stringify(msg)], {
    type: "application/json",
  });
  ws.send(msg_blob);
}

function listenForWsMessages(
  ws: WebSocket,
  callbacks: (msg: BackendMessage) => void
) {
  ws.addEventListener("message", (event: MessageEvent<any>) => {
    callbacks(parseWebsocketMessage(event));
  });
}

function parseWebsocketMessage(raw_msg: MessageEvent<any>) {
  return JSON.parse(raw_msg.data) as BackendMessage;
}
