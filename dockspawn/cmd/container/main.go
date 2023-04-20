package container

import (
	"context"
	"net/http"
	"os"

	"github.com/akshat2602/discovery/dockspawn/cmd/dspawn"
	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"github.com/google/uuid"
)

// TODO: Restrict access to the routes based on the Method of request

type ContainerRequestBody struct {
	AssessmentID uuid.UUID `json:"assessment_id"`
}

func HandleContainerCreation(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	var csrb = ContainerRequestBody{}
	helper.JSONDecode(&csrb, w, r)

	absLocalPath, err := GetDockerLocalPath(csrb.AssessmentID.String())
	if err != nil {
		helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
	absGlobalPath, err := GetRootPath(csrb.AssessmentID.String())
	if err != nil {
		helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = os.Stat(absLocalPath)
	if os.IsNotExist(err) {
		// path does not exist
		helper.Logger.Sugar().Info("Directory does not exist, creating directory: ", absLocalPath)
		err = os.Mkdir(absLocalPath, os.ModePerm)
		if err != nil {
			helper.Logger.Sugar().Error("Error while creating directory: ", err)
			helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
			return
		}
		err = PopulateContainer(absLocalPath)
		if err != nil {
			helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
	rccb, err := FetchContaionerCreationConfig(csrb.AssessmentID)
	if err != nil {
		helper.WriteErrorToResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
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

	containerID, err := dspawn.ContainerNameToID(ctx, aID.String())
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

	containerID, err := dspawn.ContainerNameToID(ctx, aID.String())
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
