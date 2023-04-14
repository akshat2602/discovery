package files

import (
	"context"
	"encoding/json"
	"os"
	"os/exec"

	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"nhooyr.io/websocket"
)

func WriteFile(ctx context.Context, wsc *websocket.Conn, p helper.WSPayload) {
	f, err := os.OpenFile(p.FilePath, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		helper.Logger.Sugar().Error("Error while opening file: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}

	defer f.Close()
	err = f.Truncate(0)
	if err != nil {
		helper.Logger.Sugar().Error("Error while truncating: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	if _, err = f.WriteString(p.Data); err != nil {
		helper.Logger.Sugar().Error("Error while writing to file: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	// Convert the data to WSRequestResponse struct
	resp := helper.WSRequestResponse{
		Type: "writeFile",
		Payload: helper.WSPayload{
			Data:     "File written successfully",
			FilePath: p.FilePath,
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		helper.Logger.Sugar().Error("Error while marshalling: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
}

func ReadFile(ctx context.Context, wsc *websocket.Conn, p helper.WSPayload) {
	f, err := os.Open(p.FilePath)
	if err != nil {
		helper.Logger.Sugar().Error("Error while opening file: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}

	defer f.Close()
	fi, err := f.Stat()
	if err != nil {
		helper.Logger.Sugar().Error("Error while getting file stats: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	buf := make([]byte, fi.Size())
	_, err = f.Read(buf)
	if err != nil {
		helper.Logger.Sugar().Error("Error while reading file: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	// Convert the data to WSRequestResponse struct
	resp := helper.WSRequestResponse{
		Type: "readFile",
		Payload: helper.WSPayload{
			Data:     string(buf),
			FilePath: p.FilePath,
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		helper.Logger.Sugar().Error("Error while marshalling: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
}

func DeleteFile(ctx context.Context, wsc *websocket.Conn, p helper.WSPayload) {
	err := os.Remove(p.FilePath)
	if err != nil {
		helper.Logger.Sugar().Error("Error while deleting file: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	// Convert the data to WSRequestResponse struct
	resp := helper.WSRequestResponse{
		Type: "deleteFile",
		Payload: helper.WSPayload{
			Data:     "File deleted successfully",
			FilePath: p.FilePath,
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		helper.Logger.Sugar().Error("Error while marshalling: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
}

func CreateDirectory(ctx context.Context, wsc *websocket.Conn, p helper.WSPayload) {
	err := os.Mkdir(p.FilePath, 0755)
	if err != nil {
		helper.Logger.Sugar().Error("Error while creating directory: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	// Convert the data to WSRequestResponse struct
	resp := helper.WSRequestResponse{
		Type: "createDirectory",
		Payload: helper.WSPayload{
			Data:     "Directory created successfully",
			FilePath: p.FilePath,
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		helper.Logger.Sugar().Error("Error while marshalling: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
}

func DeleteDirectory(ctx context.Context, wsc *websocket.Conn, p helper.WSPayload) {
	err := os.RemoveAll(p.FilePath)
	if err != nil {
		helper.Logger.Sugar().Error("Error while deleting directory: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	// Convert the data to WSRequestResponse struct
	resp := helper.WSRequestResponse{
		Type: "deleteDirectory",
		Payload: helper.WSPayload{
			Data:     "Directory deleted successfully",
			FilePath: p.FilePath,
		},
	}
	// Convert the struct to JSON
	respJSON, err := json.Marshal(resp)
	if err != nil {
		helper.Logger.Sugar().Error("Error while marshalling: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
	// Send the response to the client
	if err := wsc.Write(ctx, websocket.MessageText, respJSON); err != nil {
		helper.Logger.Sugar().Error("Error while sending response to client: ", err)
		helper.HandleWSErrorResp(ctx, wsc, err)
	}
}

func GetFileDirectoryStructure(directory_path string) ([]byte, error) {
	app := "tree"

	arg0 := "-f"
	arg1 := "-J"
	arg2 := "--noreport"
	cmd := exec.Command(app, arg0, arg1, arg2)
	cmd.Dir = directory_path
	stdout, err := cmd.Output()
	if err != nil {
		helper.Logger.Sugar().Info("Error while reading file directory structure: ", err)
		return nil, err
	}
	f, err := json.Marshal(stdout)
	if err != nil {
		helper.Logger.Sugar().Info("Error while marshaling file directory structure: ", err)
		return nil, err
	}
	return f, nil
}
