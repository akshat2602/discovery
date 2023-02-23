package ws

import (
	"net/http"
)

type WsServer struct {
	ServeMux http.ServeMux
}

func (ws *WsServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ws.ServeMux.ServeHTTP(w, r)
}

func InitializeWSServer() *WsServer {
	return &WsServer{}
}
