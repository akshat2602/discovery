package files

import (
	"context"
	"encoding/json"
	"io"
	"log"
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

type WSFileData struct {
	FilePath string `json:"file_path"`
	Content  string `json:"content"`
}
type RequestFileReadBody struct {
	FilePath string `json:"file_path"`
	FileName string `json:"file_name"`
}
type RequestFileCreateBody struct {
	FilePath string `json:"file_path"`
	FileName string `json:"file_name"`
}

type RequestContainerCreationBody struct {
	Image         string `json:"image"`
	UUID          string `json:"uuid"`
	ContainerName string `json:"container_name"`
	ImageVersion  string `json:"image_version"`
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
		var ws_file_data WSFileData
		err = json.Unmarshal(msg, &ws_file_data)
		if err != nil {
			helper.Logger.Sugar().Error("Unmarshalling Error: %v", err)
			return
		}
		f, err := os.OpenFile(ws_file_data.FilePath, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
		if err != nil {
			helper.Logger.Sugar().Error("Error while opening file: %v", err)
			return
		}

		defer f.Close()
		err = f.Truncate(0)
		if err != nil {
			helper.Logger.Sugar().Error("Error while truncating: %v", err)
			return
		}
		if _, err = f.WriteString(ws_file_data.Content); err != nil {
			helper.Logger.Sugar().Error("Error while writing to file: %v", err)
			return
		}
		if err := wsc.Write(ctx, websocket.MessageText, []byte(ws_file_data.Content)); err != nil {
			log.Println(err)
			return
		}
	}

}

func HandleFileRead(w http.ResponseWriter, r *http.Request) {

	var rfrb = RequestFileReadBody{}
	err := json.NewDecoder(r.Body).Decode(&rfrb)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	file, err := os.Open(rfrb.FilePath + "/" + rfrb.FileName)
	if err != nil {
		helper.Logger.Sugar().Info("Error: ", err)
		return
	}
	defer file.Close()
	data := make([]byte, 1024)
	for {
		n, err := file.Read(data)
		if err == io.EOF {
			helper.Logger.Sugar().Info("Error: ", err)
			return
		}
		if err != nil {
			helper.Logger.Sugar().Info("Error: ", err)
			return
		}

		w.Write(data[:n])
	}
}

func HandleFileCreate(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		helper.Logger.Sugar().Info("Error: Method not allowed")
		w.Write([]byte("Error: Method not allowed"))
		return
	}
	var rfcb = RequestFileCreateBody{}
	err := json.NewDecoder(r.Body).Decode(&rfcb)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	f, err := os.Create(rfcb.FilePath + "/" + rfcb.FileName)
	if err != nil {
		log.Printf(err.Error())
	}
	defer f.Close()
	w.Write([]byte("File created successfully"))
}

func HandleContainerCreation(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		helper.Logger.Sugar().Info("Error: %v", err)
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
	file_directory_structure, err := GetFileDirectoryStructure("directory_path")
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
