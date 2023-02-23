package helper

import (
	"encoding/json"
	"log"
	"net/http"

	"go.uber.org/zap"
)

var Logger *zap.Logger

type ErrorMap map[string]string

type Errors []ErrorMap

func InitializeLogger() {
	var err error
	Logger, err = zap.NewDevelopment()
	if err != nil {
		log.Fatalf("can't initialize zap logger: %v", err)
	}
	Logger.Info("Logger initialized")
}

func WriteMessageToResponse(w http.ResponseWriter, errorMessage string, statusCode int) {
	w.WriteHeader(statusCode)
	e := Error{
		Error: errorMessage,
	}
	json.NewEncoder(w).Encode(e)
}

func JSONDecode(data interface{}, w http.ResponseWriter, r *http.Request) {
	err := json.NewDecoder(r.Body).Decode(data)
	if err != nil {
		Logger.Info("Error: ", zap.Error(err))
		WriteMessageToResponse(w, err.Error(), http.StatusBadRequest)
	}
}

type Error struct {
	Error string `json:"error"`
}
