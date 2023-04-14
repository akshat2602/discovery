package dspawn

import (
	"context"
	"errors"

	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/docker/client"
)

type RequestContainerCreationBody struct {
	Image        string `json:"image"`
	AssessmentID string `json:"assessment_id"`
	ImageVersion string `json:"image_version"`
	RunCommand   string `json:"run_command"`
}

var dockercli *client.Client

var term_size [2]uint = [2]uint{80, 24}
var exec_cfg types.ExecConfig = types.ExecConfig{
	User:         "",
	Privileged:   false,
	Tty:          true,
	ConsoleSize:  &term_size,
	AttachStdin:  true,
	AttachStdout: true,
	AttachStderr: true,
	Detach:       false,
	Env:          nil,
	WorkingDir:   "/",
	Cmd:          []string{"sh", "-c", "TERM=xterm-256color /bin/bash"},
}

func InitializeDockerClient() {
	var err error
	dockercli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		helper.Logger.Sugar().Info("Unable to init docker client", err)
	}
}

func CreateExec(ctx context.Context, container_id string) (types.IDResponse, error) {
	exec_id, err := dockercli.ContainerExecCreate(ctx, container_id, exec_cfg)
	if err != nil {
		helper.Logger.Sugar().Info("Container Exec Create failed: ", err)
		return types.IDResponse{}, err
	}
	return exec_id, nil
}

func AttachExec(ctx context.Context, container_id string, exec_id types.IDResponse) (types.HijackedResponse, error) {
	exec_attach_config := types.ExecStartCheck{Detach: false, Tty: true, ConsoleSize: exec_cfg.ConsoleSize}
	hresp, err := dockercli.ContainerExecAttach(ctx, exec_id.ID, exec_attach_config)
	if err != nil {
		helper.Logger.Sugar().Info("Container Exec Attach failed: ", err)
		return types.HijackedResponse{}, err
	}
	return hresp, nil
}

func ContainerCreate(ctx context.Context, containerOptions RequestContainerCreationBody, absPath string) (container.CreateResponse, error) {
	resp, err := dockercli.ContainerCreate(ctx, &container.Config{
		Image: containerOptions.Image + ":" + containerOptions.ImageVersion,
	}, &container.HostConfig{
		Mounts: []mount.Mount{
			{
				Type:   mount.TypeBind,
				Source: absPath,
				Target: "/app",
			},
		},
	}, nil, nil, containerOptions.AssessmentID)
	if err != nil {
		helper.Logger.Sugar().Info("Container create failed: ", err)
		return container.CreateResponse{}, err
	}
	return resp, nil
}

func ContainerStop(ctx context.Context, container_id string) error {
	err := dockercli.ContainerStop(ctx, container_id, container.StopOptions{})
	if err != nil {
		helper.Logger.Sugar().Info("Container Stop failed: ", err)
		return err
	}
	return nil
}

func ContainerRemove(ctx context.Context, container_id string) error {
	err := dockercli.ContainerRemove(ctx, container_id, types.ContainerRemoveOptions{})
	if err != nil {
		helper.Logger.Sugar().Info("Container Remove failed: ", err)
		return err
	}
	return nil
}

func ContainerStart(ctx context.Context, container_id string) error {
	if err := dockercli.ContainerStart(ctx, container_id, types.ContainerStartOptions{}); err != nil {
		helper.Logger.Sugar().Info("Container Start failed: ", err)
		return err
	}
	return nil
}

func ContainerNameToID(ctx context.Context, container_name string) (string, error) {
	f := filters.Args{}
	f.Add("name", container_name)
	containers, err := dockercli.ContainerList(ctx, types.ContainerListOptions{
		Filters: f,
	})
	if err != nil {
		helper.Logger.Sugar().Info("Container List failed: ", err)
		return "", err
	}
	if len(containers) > 0 {
		return containers[0].ID, nil
	}
	return "", errors.New("container not found")
}
