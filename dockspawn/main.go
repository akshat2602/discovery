package main

import (
	"log"
	"net/http"
	"time"

	"github.com/akshat2602/discovery/dockspawn/cmd/terminal"
	"github.com/akshat2602/discovery/dockspawn/cmd/ws"
	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
)

func main() {
	helper.InitializeLogger()
	cs := ws.InitializeWSServer()
	cs.ServeMux.HandleFunc("/terminal", func(w http.ResponseWriter, r *http.Request) {
		terminal.ServeTerminal(cs, w, r)
	})
	s := &http.Server{
		Handler:      cs,
		ReadTimeout:  time.Second * 10,
		WriteTimeout: time.Second * 10,
	}
	log.Printf("listening on %s", "localhost:8000")
	s.ListenAndServe()
}
