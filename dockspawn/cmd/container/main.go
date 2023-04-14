package container

import (
	"bytes"
	"context"
	"net/http"
	"os"
	"os/exec"
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
	helper.Logger.Sugar().Info("Current working directory: ", pwd)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var rccb = dspawn.RequestContainerCreationBody{}

	helper.JSONDecode(&rccb, w, r)

	host_machine_pwd := os.Getenv("DOCKER_HOST_FILE_DIRECTORY_ROOT")
	absLocalPath, err := filepath.Abs(pwd + "/" + rccb.AssessmentID)
	if err != nil {
		helper.Logger.Sugar().Info("Error while getting absolute path: ", err)
		helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
	absGlobalPath, err := filepath.Abs(host_machine_pwd + "/" + rccb.AssessmentID)
	if err != nil {
		helper.Logger.Sugar().Info("Error while getting absolute path: ", err)
		helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = os.Stat(absLocalPath)
	if os.IsNotExist(err) {
		// path does not exist
		helper.Logger.Sugar().Info("Directory does not exist, creating directory: ", absLocalPath)
		err = os.Mkdir(absLocalPath, os.ModePerm)
		if err != nil {
			helper.Logger.Sugar().Info("Error while creating directory: ", err)
			helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
	// TODO: Download files
	// TODO: Use the run command here
	app := "/bin/bash"
	arg1 := "-c"
	arg2 := "npm create vite@latest -y code -- --template react"
	cmd := exec.Command(app, arg1, arg2)
	cmd.Dir = absLocalPath

	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr

	err = cmd.Run()
	if err != nil {
		helper.Logger.Sugar().Info("Error while creating vite files for assessment: ", err)
		helper.Logger.Sugar().Info("stderr: ", stderr.String())
		return
	}
	// app := "/bin/bash"
	// arg1 := "npm create vite@latest -y code -- --template react"
	// cmd := exec.Command(app, arg1)
	// cmd.Dir = absLocalPath
	// _, err = cmd.Output()
	// if err != nil {
	// 	helper.Logger.Sugar().Info("Error while creating vite files for assessment: ", err)
	// 	return
	// }
	resp, err := dspawn.ContainerCreate(ctx, rccb, absGlobalPath)
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
