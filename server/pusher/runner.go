package pusher

import (
	"fmt"
	"os"

	"github.com/pusher/pusher-http-go"
)

func Init() pusher.Client {
	pusherClient := pusher.Client{
		AppID:   os.Getenv("app_id "),
		Key:     "key",
		Secret:  "secret",
		Cluster: "cluster",
		Secure:  true,
	}

	fmt.Println("Pusher client initiated")

	return pusherClient
}
