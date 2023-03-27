package files

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"os/exec"

	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/docker/client"
	"nhooyr.io/websocket"
)

// TODO: Change these structs to private structs
// TODO: Properly define the return values for the responses
// TODO: Restrict access to the routes based on the Method of request

type WSPayload struct {
	Data     string `json:"data"`
	FilePath string `json:"file_path"`
}

type WSRequestResponse struct {
	Type    string    `json:"type"`
	Payload WSPayload `json:"payload"`
}

type RequestContainerCreationBody struct {
	Image         string `json:"image"`
	UUID          string `json:"uuid"`
	ContainerName string `json:"container_name"`
	ImageVersion  string `json:"image_version"`
}
type DirectoryPathRequestBody struct {
	DirectoryPath string `json:"directory_path"`
}

func HandleFileChange(w http.ResponseWriter, r *http.Request) {
	wsc, err := websocket.Accept(w, r, &websocket.AcceptOptions{InsecureSkipVerify: true})
	if err != nil {
		helper.Logger.Sugar().Info("Failed to accept websocket connection: %v", err)
		return
	}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	for {
		_, msg, err := wsc.Read(ctx)

		if err != nil {
			helper.Logger.Sugar().Error("Failed to read message from web socket: %v", err)
			return
		}
		var ws_request WSRequestResponse
		err = json.Unmarshal(msg, &ws_request)
		if err != nil {
			helper.Logger.Sugar().Error("Unmarshalling Error: %v", err)
			return
		}

		switch ws_request.Type {
		case "writeFile":
			WriteFile(ctx, wsc, ws_request.Payload)
		case "readFile":
			ReadFile(ctx, wsc, ws_request.Payload)
		case "deleteFile":
			DeleteFile(ctx, wsc, ws_request.Payload)
		case "createFolder":
			CreateDirectory(ctx, wsc, ws_request.Payload)
		case "deleteFolder":
			DeleteDirectory(ctx, wsc, ws_request.Payload)
		default:
			helper.Logger.Sugar().Error("Invalid request type")
			handleWSErrorResp(ctx, wsc, errors.New("invalid request type"))
		}
	}
}

func HandleContainerCreation(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		helper.Logger.Sugar().Info("Error: ", err)
		return
	}
	defer cli.Close()
	pwd, err := os.Getwd()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	host_machine_pwd := os.Getenv("DOCKER_HOST_FILE_DIRECTORY_ROOT")
	var rccb = RequestContainerCreationBody{}
	err = json.NewDecoder(r.Body).Decode(&rccb)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err != nil {
		helper.Logger.Sugar().Info("Error: %v", err)
		return
	}
	err = os.Mkdir(pwd+"/"+rccb.UUID, os.ModePerm)
	helper.Logger.Sugar().Info("PWD: ", pwd)
	if err != nil {
		helper.Logger.Sugar().Info("Error while creating directory: %v", err)
		return
	}
	resp, err := cli.ContainerCreate(ctx, &container.Config{
		Image: rccb.Image + ":" + rccb.ImageVersion,
	}, &container.HostConfig{
		Mounts: []mount.Mount{
			{
				Type:   mount.TypeBind,
				Source: host_machine_pwd + "/" + rccb.UUID,
				Target: "/app",
			},
		},
	}, nil, nil, rccb.ContainerName)
	if err != nil {
		helper.Logger.Sugar().Info("Error: %v", err)
		return
	}

	if err := cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		helper.Logger.Sugar().Info("Error: %v", err)
		return
	}
	w.Write([]byte(resp.ID))

}
func HandleFileDirectoryStructure(w http.ResponseWriter, r *http.Request) {
	var dprb = DirectoryPathRequestBody{}
	err := json.NewDecoder(r.Body).Decode(&dprb)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	file_directory_structure, err := GetFileDirectoryStructure(dprb.DirectoryPath)
	if err != nil {
		helper.Logger.Sugar().Info("Error while reading file directory structure: %v", err)
		return
	}
	w.Write(file_directory_structure)
}
func GetFileDirectoryStructure(directory_path string) ([]byte, error) {
	app := "tree"

	arg0 := "-f"
	arg1 := "-J"
	cmd := exec.Command(app, arg0, arg1)
	cmd.Dir = directory_path
	stdout, err := cmd.Output()

	if err != nil {
		return nil, err
	}

	return stdout, nil
}
