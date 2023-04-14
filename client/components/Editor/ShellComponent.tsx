import { Box } from "@chakra-ui/react";

import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

import { useEffect, useMemo, useRef } from "react";
// import { useRouter } from "next/router";

import { useBearStore } from "../../store/bearStore";

export const ShellComponent: React.FC = () => {
  const setTerminalWs = useBearStore((state) => state.setTerminalWs);
  const terminal = useRef(null);
  // const router = useRouter();
  // const assessmentId = router.query["assessmentId"];

  const isBrowser = typeof window !== "undefined";
  const ws = useMemo(
    () => (isBrowser ? new WebSocket("ws://localhost:8080/terminal") : null),
    [isBrowser]
  );

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      theme: {
        background: "#303841",
        foreground: "#f8f8f2",
        cyan: "#8be9fd",
        green: "#50fa7b",
        yellow: "#f1fa8c",
        red: "#ff5555",
        cursor: "#f8f8f2",
        cursorAccent: "#282a36",
      },
      fontSize: 16,
      fontFamily: "Ubuntu Mono, monospace",
    });
    if (terminal.current) {
      term.open(terminal.current);
      let fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      fitAddon.fit();
    }
    if (ws) {
      ws.onopen = () => {
        const attachAddon = new AttachAddon(ws);
        term.loadAddon(attachAddon);
        setTerminalWs(ws);
      };
    }

    return () => {
      term.dispose();
    };
  }, [setTerminalWs, ws]);

  return (
    <Box
      h="23vh"
      overflow="auto"
      sx={{ scrollbarColor: "#282a36 white" }}
      ref={terminal}
      className="terminal"
      id="terminal-container"
    />
  );
};
