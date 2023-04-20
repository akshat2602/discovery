package helper

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"go.uber.org/zap"
	"nhooyr.io/websocket"
)

var Logger *zap.Logger

type Response struct {
	Message interface{} `json:"message"`
	Status  int         `json:"status"`
}

type WSPayload struct {
	Data         string `json:"data"`
	FilePath     string `json:"file_path"`
	AssessmentID string `json:"assessment_id"`
	Port         string `json:"port"`
}

type WSRequestResponse struct {
	Type    string    `json:"type"`
	Payload WSPayload `json:"payload"`
}

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

func WriteMessageToResponse(w http.ResponseWriter, message interface{}, statusCode int) {
	w.WriteHeader(statusCode)
	resp := Response{
		Message: message,
		Status:  statusCode,
	}
	json.NewEncoder(w).Encode(resp)
}

func WriteErrorToResponse(w http.ResponseWriter, errorMessage string, statusCode int) {
	w.WriteHeader(statusCode)
	e := Error{
		Error: errorMessage,
	}
	json.NewEncoder(w).Encode(e)
}

func HandleWSErrorResp(ctx context.Context, wsc *websocket.Conn, err error) {
	// Convert the data to WSRequestResponse struct
	resp := WSRequestResponse{
		Type: "error",
		Payload: WSPayload{
			Data: err.Error(),
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		Logger.Sugar().Error("Error while marshalling: ", err)
		return
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		Logger.Sugar().Error("Error while sending response to client: ", err)
		return
	}
}

func JSONDecode(data interface{}, w http.ResponseWriter, r *http.Request) {
	err := json.NewDecoder(r.Body).Decode(data)
	if err != nil {
		Logger.Info("Error: ", zap.Error(err))
		WriteErrorToResponse(w, err.Error(), http.StatusBadRequest)
	}
}

type Error struct {
	Error string `json:"error"`
}
