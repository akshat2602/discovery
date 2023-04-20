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
	"github.com/docker/go-connections/nat"
	"github.com/google/uuid"
)

type ContainerCreationConfig struct {
	Image        string    `json:"image"`
	AssessmentID uuid.UUID `json:"assessment_id"`
	ImageVersion string    `json:"image_version"`
	RunCommand   string    `json:"run_command"`
}

var dockerCli *client.Client

// var termSize [2]uint = [2]uint{160, 24}
var execCfg types.ExecConfig = types.ExecConfig{
	User:       "root",
	Privileged: false,
	Tty:        true,
	// ConsoleSize:  &termSize,
	AttachStdin:  true,
	AttachStdout: true,
	AttachStderr: true,
	Detach:       false,
	Env:          nil,
	WorkingDir:   "/app",
	Cmd:          []string{"/bin/bash", "-c", "TERM=xterm-256color /bin/bash"},
}

func InitializeDockerClient() {
	var err error
	dockerCli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		helper.Logger.Sugar().Error("Unable to init docker client", err)
	}
}

func CreateExec(ctx context.Context, containerID string) (types.IDResponse, error) {
	execID, err := dockerCli.ContainerExecCreate(ctx, containerID, execCfg)
	if err != nil {
		helper.Logger.Sugar().Error("Container Exec Create failed: ", err)
		return types.IDResponse{}, err
	}
	return execID, nil
}

func AttachExec(ctx context.Context, containerID string, execID types.IDResponse) (types.HijackedResponse, error) {
	execAttConf := types.ExecStartCheck{Detach: false, Tty: true, ConsoleSize: execCfg.ConsoleSize}
	hresp, err := dockerCli.ContainerExecAttach(ctx, execID.ID, execAttConf)
	if err != nil {
		helper.Logger.Sugar().Error("Container Exec Attach failed: ", err)
		return types.HijackedResponse{}, err
	}
	return hresp, nil
}

func ContainerCreate(ctx context.Context, containerOptions ContainerCreationConfig, absPath string) (container.CreateResponse, error) {
	resp, err := dockerCli.ContainerCreate(ctx, &container.Config{
		Cmd:          []string{"/bin/bash"},
		Tty:          true,
		AttachStdin:  true,
		AttachStdout: true,
		AttachStderr: true,
		Image:        containerOptions.Image + ":" + containerOptions.ImageVersion,
		Volumes: map[string]struct{}{
			absPath: {},
		},
		ExposedPorts: nat.PortSet{
			"5173/tcp": {},
		},
	}, &container.HostConfig{
		Binds: []string{
			absPath + "/app",
		},
		Mounts: []mount.Mount{
			{
				Type:   mount.TypeBind,
				Source: absPath,
				Target: "/app",
			},
		},
		PortBindings: nat.PortMap{
			"5173/tcp": []nat.PortBinding{
				{
					HostPort: "0",
				},
			},
		},
	}, nil, nil, containerOptions.AssessmentID.String())
	if err != nil {
		helper.Logger.Sugar().Error("Container create failed: ", err)
		return container.CreateResponse{}, err
	}
	return resp, nil
}

func ContainerStop(ctx context.Context, containerID string) error {
	err := dockerCli.ContainerStop(ctx, containerID, container.StopOptions{})
	if err != nil {
		helper.Logger.Sugar().Error("Container Stop failed: ", err)
		return err
	}
	return nil
}

func ContainerRemove(ctx context.Context, containerID string) error {
	err := dockerCli.ContainerRemove(ctx, containerID, types.ContainerRemoveOptions{})
	if err != nil {
		helper.Logger.Sugar().Error("Container Remove failed: ", err)
		return err
	}
	return nil
}

func ContainerStart(ctx context.Context, containerID string) error {
	if err := dockerCli.ContainerStart(ctx, containerID, types.ContainerStartOptions{}); err != nil {
		helper.Logger.Sugar().Error("Container Start failed: ", err)
		return err
	}
	return nil
}

func ContainerNameToID(ctx context.Context, containerName string) (string, error) {
	f := filters.NewArgs()
	f.Add("name", containerName)
	containers, err := dockerCli.ContainerList(ctx, types.ContainerListOptions{
		Filters: f,
	})
	if err != nil {
		helper.Logger.Sugar().Error("Container List failed: ", err)
		return "", err
	}
	if len(containers) > 0 {
		return containers[0].ID, nil
	}
	helper.Logger.Sugar().Info("Container not found")
	return "", errors.New("container not found")
}

func GetContainer(ctx context.Context, containerId string) (types.ContainerJSON, error) {
	c, err := dockerCli.ContainerInspect(ctx, containerId)
	if err != nil {
		helper.Logger.Sugar().Error("Container Inspect failed: ", err)
		return types.ContainerJSON{}, err
	}
	return c, nil
}
