package terminal

import (
	"net/http"

	"github.com/akshat2602/discovery/dockspawn/cmd/ws"
	"go.uber.org/zap"
	"nhooyr.io/websocket"
)

func ServeTerminal(cs *ws.WsServer, w http.ResponseWriter, r *http.Request) {
	c, err := websocket.Accept(w, r, &websocket.AcceptOptions{InsecureSkipVerify: true})
	if err != nil {
		cs.LogI("Failed to accept websocket connection: %v", zap.Error(err))
		return
	}
	// TODO: Comment the below line when logic is added as we don't want the connection to be closed.
	defer c.Close(websocket.StatusInternalError, "The sky is falling")

	// TODO: Add logic here to handle the websocket connection for terminal.
}
