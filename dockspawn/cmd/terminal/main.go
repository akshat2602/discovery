package terminal

import (
	"context"
	"net/http"

	"github.com/akshat2602/discovery/dockspawn/cmd/dspawn"
	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"github.com/docker/docker/api/types"
	"nhooyr.io/websocket"
)

func ServeTerminal(w http.ResponseWriter, r *http.Request) {
	wsc, err := websocket.Accept(w, r, &websocket.AcceptOptions{InsecureSkipVerify: true})
	if err != nil {
		helper.Logger.Sugar().Info("Failed to accept websocket connection: ", err)
		return
	}
	// defer c.Close(websocket.StatusInternalError, "The sky is falling")

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	exec_id, err := dspawn.CreateExec(ctx, "container_id")
	if err != nil {
		return
	}
	hresp, err := dspawn.AttachExec(ctx, "container_id", exec_id)
	if err != nil {
		return
	}
	// defer hresp.Close()
	terminal_process(ctx, "container_id", wsc, hresp, cancel)
}

func terminal_process(ctx context.Context, container_id string, wsc *websocket.Conn, hresp types.HijackedResponse, cancel context.CancelFunc) {
	// use channels to handle communication between the websocket and the response object
	responseCh := make(chan []byte)
	errorCh := make(chan error)

	go func() {
		var buf = make([]byte, 1024)
		for {
			n, err := hresp.Reader.Read(buf)
			if err != nil {
				errorCh <- err
				return
			}
			if n != 0 {
				responseCh <- buf[:n]
			}
		}
	}()

	go func() {
		for {
			_, msg, err := wsc.Read(ctx)
			if err != nil {
				errorCh <- err
				return
			}
			if len(msg) > 0 {
				_, err := hresp.Conn.Write(msg)
				if err != nil {
					errorCh <- err
					return
				}
			}
		}
	}()

	// listen for messages from the channels and send them to the websocket
	for {
		select {
		case response := <-responseCh:
			err := wsc.Write(ctx, websocket.MessageText, response)
			if err != nil {
				helper.Logger.Sugar().Info("Websocket write error: ", err)
				cancel()
				return
			}
		case err := <-errorCh:
			helper.Logger.Sugar().Info("Error: ", err)
			cancel()
			return
		case <-ctx.Done():
			return
		}
	}
}
