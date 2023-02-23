package main

import (
	"net/http"
	"time"

	"github.com/akshat2602/discovery/dockspawn/cmd/dspawn"
	"github.com/akshat2602/discovery/dockspawn/cmd/terminal"
	"github.com/akshat2602/discovery/dockspawn/cmd/ws"
	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
)

func main() {
	helper.InitializeLogger()
	cs := ws.InitializeWSServer()
	dspawn.InitializeDockerClient()
	cs.ServeMux.HandleFunc("/terminal", func(w http.ResponseWriter, r *http.Request) {
		terminal.ServeTerminal(w, r)
	})
	cs.ServeMux.HandleFunc("/file/change", func(w http.ResponseWriter, r *http.Request) {
		files.handleFileChange(w, r)
	})
	cs.ServeMux.HandleFunc("/file/read", func(w http.ResponseWriter, r *http.Request) {
		files.handleFileRead(w, r)
	})
	cs.ServeMux.HandleFunc("/file/create", func(w http.ResponseWriter, r *http.Request) {
		files.handleFileCreate(w, r)
	})
	cs.ServeMux.HandleFunc("/container/create", func(w http.ResponseWriter, r *http.Request) {
		files.handleContainerCreation(w, r)
	})
	s := &http.Server{
		Addr:         "localhost:8080",
		Handler:      cs,
		ReadTimeout:  time.Second * 10,
		WriteTimeout: time.Second * 10,
	}
	helper.Logger.Sugar().Info("Listening on", s.Addr)
	s.ListenAndServe()
}
