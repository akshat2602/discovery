package files

import (
	"context"
	"encoding/json"
	"os"

	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"nhooyr.io/websocket"
)

func WriteFile(ctx context.Context, wsc *websocket.Conn, p WSPayload) {
	f, err := os.OpenFile(p.FilePath, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		helper.Logger.Sugar().Error("Error while opening file: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}

	defer f.Close()
	err = f.Truncate(0)
	if err != nil {
		helper.Logger.Sugar().Error("Error while truncating: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	if _, err = f.WriteString(p.Data); err != nil {
		helper.Logger.Sugar().Error("Error while writing to file: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	// Convert the data to WSRequestResponse struct
	resp := WSRequestResponse{
		Type: "writeFile",
		Payload: WSPayload{
			Data:     "File written successfully",
			FilePath: p.FilePath,
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		helper.Logger.Sugar().Error("Error while marshalling: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
}

func ReadFile(ctx context.Context, wsc *websocket.Conn, p WSPayload) {
	f, err := os.Open(p.FilePath)
	if err != nil {
		helper.Logger.Sugar().Error("Error while opening file: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}

	defer f.Close()
	fi, err := f.Stat()
	if err != nil {
		helper.Logger.Sugar().Error("Error while getting file stats: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	buf := make([]byte, fi.Size())
	_, err = f.Read(buf)
	if err != nil {
		helper.Logger.Sugar().Error("Error while reading file: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	// Convert the data to WSRequestResponse struct
	resp := WSRequestResponse{
		Type: "readFile",
		Payload: WSPayload{
			Data:     string(buf),
			FilePath: p.FilePath,
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		helper.Logger.Sugar().Error("Error while marshalling: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
}

func DeleteFile(ctx context.Context, wsc *websocket.Conn, p WSPayload) {
	err := os.Remove(p.FilePath)
	if err != nil {
		helper.Logger.Sugar().Error("Error while deleting file: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	// Convert the data to WSRequestResponse struct
	resp := WSRequestResponse{
		Type: "deleteFile",
		Payload: WSPayload{
			Data:     "File deleted successfully",
			FilePath: p.FilePath,
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		helper.Logger.Sugar().Error("Error while marshalling: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
}

func CreateDirectory(ctx context.Context, wsc *websocket.Conn, p WSPayload) {
	err := os.Mkdir(p.FilePath, 0755)
	if err != nil {
		helper.Logger.Sugar().Error("Error while creating directory: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	// Convert the data to WSRequestResponse struct
	resp := WSRequestResponse{
		Type: "createDirectory",
		Payload: WSPayload{
			Data:     "Directory created successfully",
			FilePath: p.FilePath,
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		helper.Logger.Sugar().Error("Error while marshalling: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
}

func DeleteDirectory(ctx context.Context, wsc *websocket.Conn, p WSPayload) {
	err := os.RemoveAll(p.FilePath)
	if err != nil {
		helper.Logger.Sugar().Error("Error while deleting directory: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	// Convert the data to WSRequestResponse struct
	resp := WSRequestResponse{
		Type: "deleteDirectory",
		Payload: WSPayload{
			Data:     "Directory deleted successfully",
			FilePath: p.FilePath,
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		helper.Logger.Sugar().Error("Error while marshalling: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: %v", err)
		handleWSErrorResp(ctx, wsc, err)
	}
}

func handleWSErrorResp(ctx context.Context, wsc *websocket.Conn, err error) {
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
		helper.Logger.Sugar().Error("Error while marshalling: %v", err)
		return
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: %v", err)
		return
	}
}
