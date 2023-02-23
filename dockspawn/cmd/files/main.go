package files

import (
	"context"
	"encoding/json"
	"fmt"
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
	"github.com/docker/docker/pkg/stdcopy"
	"nhooyr.io/websocket"
)

type WSFileData struct {
	FilePath string `json:"file_path"`
	Content  string `json:"content"`
}

func handleFileChange(w http.ResponseWriter, r *http.Request) {
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
func handleReadFile(w http.ResponseWriter, r *http.Request) {

	file, err := os.Open("hello.txt")
	if err != nil {
		fmt.Println("File reading error", err)
		return
	}
	defer file.Close()
	data := make([]byte, 1024)
	for {
		n, err := file.Read(data)
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("File reading error", err)
			return
		}
		w.Write(data[:n])
	}
}

func handleFileCreate(w http.ResponseWriter, r *http.Request) {
	path := "./"
	file_name := "testFile.txt"
	f, err := os.Create(path + file_name)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	fmt.Println(f.Name())
}
func handleContainerCreation(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	defer cli.Close()
	pwd, err := os.Getwd()
	err = os.Mkdir(pwd+"/uuid", os.ModePerm)
	resp, err := cli.ContainerCreate(ctx, &container.Config{
		Image: "tempfile:latest",
	}, &container.HostConfig{
		Mounts: []mount.Mount{
			{
				Type:   mount.TypeBind,
				Source: pwd + "/uuid",
				Target: "/app",
			},
		},
	}, nil, nil, "test_container")
	if err != nil {
		panic(err)
	}

	if err := cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		panic(err)
	}

	statusCh, errCh := cli.ContainerWait(ctx, resp.ID, container.WaitConditionNotRunning)
	select {
	case err := <-errCh:
		if err != nil {
			panic(err)
		}
	case <-statusCh:
	}

	out, err := cli.ContainerLogs(ctx, resp.ID, types.ContainerLogsOptions{ShowStdout: true})
	if err != nil {
		panic(err)
	}

	stdcopy.StdCopy(os.Stdout, os.Stderr, out)
}

func getFileDirectoryStructure(directory_path string) ([]byte, error) {
	app := "tree"

	arg0 := "-f"
	arg1 := "-J"
	cmd := exec.Command(app, arg0, arg1)
	cmd.Dir = directory_path
	stdout, err := cmd.Output()

	if err != nil {
		fmt.Println(err.Error())
		return nil, err
	}

	return stdout, nil
}
