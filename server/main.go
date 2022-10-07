package main

//go:generate go run main.go

import (
	"fmt"
	"os"

	Pusher "github.com/Sam44323/go-pusher/pusher"
	Utils "github.com/Sam44323/go-pusher/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	Utils.LoadEnv()
	// initiating the pusher-client
	Pusher.Init()

	fmt.Printf("Starting server... %s", os.Getenv("DATA"))
	app := fiber.New()

	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Listen(":3000")
}
