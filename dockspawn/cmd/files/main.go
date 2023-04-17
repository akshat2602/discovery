package files

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"nhooyr.io/websocket"
)

// TODO: Change these structs to private structs
// TODO: Restrict access to the routes based on the Method of request
type FolderStructure struct {
	Type     string            `json:"type"`
	Name     string            `json:"name"`
	Contents []FolderStructure `json:"contents"`
}

func ServeFiles(w http.ResponseWriter, r *http.Request) {
	wsc, err := websocket.Accept(w, r, &websocket.AcceptOptions{InsecureSkipVerify: true})
	if err != nil {
		helper.Logger.Sugar().Error("Failed to accept websocket connection: ", err)
		return
	}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	for {
		_, msg, err := wsc.Read(ctx)

		if err != nil {
			helper.Logger.Sugar().Error("Failed to read message from web socket: ", err)
			return
		}
		var wsReq helper.WSRequestResponse
		err = json.Unmarshal(msg, &wsReq)
		if err != nil {
			helper.Logger.Sugar().Error("Unmarshalling Error: ", err)
			return
		}

		switch wsReq.Type {
		case "writeFile":
			WriteFile(ctx, wsc, wsReq.Payload)
		case "readFile":
			ReadFile(ctx, wsc, wsReq.Payload)
		case "createFile":
			CreateFile(ctx, wsc, wsReq.Payload)
		case "deleteFile":
			DeleteFile(ctx, wsc, wsReq.Payload)
		case "createFolder":
			CreateDirectory(ctx, wsc, wsReq.Payload)
		case "deleteFolder":
			DeleteDirectory(ctx, wsc, wsReq.Payload)
		default:
			helper.Logger.Sugar().Error("Invalid request type")
			helper.HandleWSErrorResp(ctx, wsc, errors.New("invalid request type"))
		}
	}
}

func HandleFileDirectoryStructure(w http.ResponseWriter, r *http.Request) {
	qParams := r.URL.Query()
	dprb := qParams.Get("assessment_id")
	if dprb == "" {
		helper.WriteErrorToResponse(w, errors.New("assessment id not specified").Error(), http.StatusBadRequest)
		return
	}
	fileStructure, err := GetFileDirectoryStructure("./" + dprb)
	if err != nil {
		helper.Logger.Sugar().Error("Error while reading file directory structure: ", err)
		helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var f interface{}
	json.Unmarshal(fileStructure, &f)
	helper.WriteMessageToResponse(w, f, http.StatusOK)
}
