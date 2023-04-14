package container

import (
	"context"
	"net/http"
	"os"
	"path/filepath"

	"github.com/akshat2602/discovery/dockspawn/cmd/dspawn"
	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
)

// TODO: Change these structs to private structs
// TODO: Restrict access to the routes based on the Method of request

type ContainerRequestBody struct {
	AssessmentID string `json:"assessment_id"`
}

func HandleContainerCreation(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	pwd, err := os.Getwd()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var rccb = dspawn.RequestContainerCreationBody{}

	helper.JSONDecode(&rccb, w, r)

	absPath, err := filepath.Abs(pwd + "/../../" + rccb.AssessmentID)
	if err != nil {
		helper.Logger.Sugar().Info("Error while getting absolute path: ", err)
		helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = os.Stat(absPath)
	if os.IsNotExist(err) {
		// path does not exist
		err = os.Mkdir(absPath, os.ModePerm)
		if err != nil {
			helper.Logger.Sugar().Info("Error while creating directory: ", err)
			helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
	// TODO: Download files
	// TODO: Run create vite app command
	resp, err := dspawn.ContainerCreate(ctx, rccb, absPath)
	if err != nil {
		helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = dspawn.ContainerStart(ctx, resp.ID)
	if err != nil {
		helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
	helper.WriteMessageToResponse(w, "Container created successfully", http.StatusOK)
}

func HandleContainerStop(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	var csrb = ContainerRequestBody{}
	helper.JSONDecode(&csrb, w, r)
	aID := csrb.AssessmentID

	containerID, err := dspawn.ContainerNameToID(ctx, aID)
	if err != nil {
		helper.WriteErrorToResponse(w, "An error occured while getting the container ID: "+err.Error(), http.StatusInternalServerError)
		return
	}
	err = dspawn.ContainerStop(ctx, containerID)
	if err != nil {
		helper.WriteErrorToResponse(w, "An error occured while stopping the container: "+err.Error(), http.StatusInternalServerError)
		return
	}
	helper.WriteMessageToResponse(w, "Successfully Stopped the container", http.StatusOK)
}

func HandleContainerRemove(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	var crmrb = ContainerRequestBody{}
	helper.JSONDecode(&crmrb, w, r)
	aID := crmrb.AssessmentID

	containerID, err := dspawn.ContainerNameToID(ctx, aID)
	if err != nil {
		helper.WriteErrorToResponse(w, "An error occured while getting the container ID: "+err.Error(), http.StatusInternalServerError)
		return
	}
	err = dspawn.ContainerRemove(ctx, containerID)
	// TODO: Check if this line is required
	// err = cli.ContainerStop(ctx, container_id, container.StopOptions{})
	// TODO: File Removal logic
	if err != nil {
		helper.WriteErrorToResponse(w, "An error occured while removing the container: "+err.Error(), http.StatusInternalServerError)
		return
	}
	helper.WriteMessageToResponse(w, "Successfully removed the container", http.StatusOK)
}
