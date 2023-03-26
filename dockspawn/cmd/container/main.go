package container

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

// TODO: Change these structs to private structs
// TODO: Properly define the return values for the responses
// TODO: Restrict access to the routes based on the Method of request

type ContainerStopRequestBody struct {
	ContainerID string `json:"container_id"`
}
type ContainerRemoveRequestBody struct {
	ContainerID string `json:"container_id"`
}

func HandleContainerStop(w http.ResponseWriter, r *http.Request) {
	var csrb = ContainerStopRequestBody{}
	err := json.NewDecoder(r.Body).Decode(&csrb)
	if err != nil {
		helper.Logger.Sugar().Info("Error ", err)
		// TODO: respond with error
		return
	}

	container_id := csrb.ContainerID

	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		helper.Logger.Sugar().Info("Error ", err)
	}
	defer cli.Close()
	err = cli.ContainerStop(ctx, container_id, container.StopOptions{})
	if err != nil {
		helper.Logger.Sugar().Info("Error ", err)
		// TODO: respond with error
		return
	}
	w.Write([]byte("Successfully Stopped the container with id " + container_id))
}

func HandleContainerRemove(w http.ResponseWriter, r *http.Request) {
	var crmrb = ContainerStopRequestBody{}
	err := json.NewDecoder(r.Body).Decode(&crmrb)
	if err != nil {
		helper.Logger.Sugar().Info("Error ", err)
		// TODO: respond with error
		return
	}

	container_id := crmrb.ContainerID
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		helper.Logger.Sugar().Info("Error ", err)
	}
	defer cli.Close()
	cli.ContainerRemove(ctx, container_id, types.ContainerRemoveOptions{})
	err = cli.ContainerStop(ctx, container_id, container.StopOptions{})

	// TODO: File Removal logic
	if err != nil {
		helper.Logger.Sugar().Info("Error ", err)
		// TODO: respond with error
		return
	}

	w.Write([]byte("Successfully Removed the container with id " + container_id))
}
