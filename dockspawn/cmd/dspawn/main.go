package dspawn

import (
	"context"

	"github.com/akshat2602/discovery/dockspawn/pkg/helper"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

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
