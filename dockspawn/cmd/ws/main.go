package ws

import (
	"net/http"

	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"go.uber.org/zap/zapcore"
)

type WsServer struct {
	LogI     func(msg string, fields ...zapcore.Field)
	ServeMux http.ServeMux
}

func (ws *WsServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ws.ServeMux.ServeHTTP(w, r)
}

func InitializeWSServer() *WsServer {
	return &WsServer{
		LogI: func(msg string, fields ...zapcore.Field) {
			helper.Logger.Info(msg, fields...)
		},
	}
}
