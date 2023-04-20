package container

import (
	"bytes"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/akshat2602/discovery/dockspawn/cmd/dspawn"
	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"github.com/google/uuid"
)

func PopulateContainer(absLocalPath string) error {
	app := "/bin/bash"
	arg1 := "-c"
	// TODO: Download files
	arg2 := "npm create vite@latest -y code -- --template react"
	cmd := exec.Command(app, arg1, arg2)
	cmd.Dir = absLocalPath

	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		helper.Logger.Sugar().Error("Error while creating files for assessment: ", err)
		helper.Logger.Sugar().Error("stderr: ", stderr.String())
		return err
	}
	return nil
}

func GetDockerLocalPath(assessmentID string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		helper.Logger.Sugar().Error("Error while getting current working directory: ", err)
		return "", err
	}
	absLocalPath, err := filepath.Abs(pwd + "/" + assessmentID)
	if err != nil {
		helper.Logger.Sugar().Error("Error while getting absolute path: ", err)
		return "", err
	}
	return absLocalPath, nil
}

func GetRootPath(assessmentID string) (string, error) {
	hostMachinePwd := os.Getenv("DOCKER_HOST_FILE_DIRECTORY_ROOT")
	if hostMachinePwd == "" {
		helper.Logger.Sugar().Error("DOCKER_HOST_FILE_DIRECTORY_ROOT not set")
		return "", nil
	} else {
		absGlobalPath, err := filepath.Abs(hostMachinePwd + "/" + assessmentID)
		if err != nil {
			helper.Logger.Sugar().Error("Error while getting absolute path: ", err)
			return "", err
		}
		return absGlobalPath, nil
	}
}

func FetchContaionerCreationConfig(assessmentID uuid.UUID) (dspawn.ContainerCreationConfig, error) {
	// TODO: Fetch rccb from Django
	rccb := dspawn.ContainerCreationConfig{
		Image:        "node",
		AssessmentID: assessmentID,
		ImageVersion: "latest",
		RunCommand:   "npm run dev",
	}
	return rccb, nil
}
