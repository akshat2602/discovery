package main

import (
	"net/http"
	"time"

	"github.com/akshat2602/discovery/dockspawn/cmd/terminal"
	"github.com/akshat2602/discovery/dockspawn/cmd/ws"
	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"go.uber.org/zap"
)

func main() {
	helper.InitializeLogger()
	cs := ws.InitializeWSServer()
	cs.ServeMux.HandleFunc("/terminal", func(w http.ResponseWriter, r *http.Request) {
		terminal.ServeTerminal(cs, w, r)
	})
	s := &http.Server{
		Addr:         "localhost:8080",
		Handler:      cs,
		ReadTimeout:  time.Second * 10,
		WriteTimeout: time.Second * 10,
	}
	helper.Logger.Info("listening on", zap.String("address", s.Addr))
	s.ListenAndServe()
}
