package main

//go:generate go run main.go

import (
	Handler "github.com/Sam44323/go-pusher/controller"
	Pusher "github.com/Sam44323/go-pusher/pusher"
	Utils "github.com/Sam44323/go-pusher/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	Utils.LoadEnv()         // loading the env's
	pusher := Pusher.Init() // initiating the pusher-client

	app := fiber.New() // initializing the fiber app

	// utilising the cors middleware
	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Post("/api/message", func(c *fiber.Ctx) error {
		return Handler.MessageHandler(c, &pusher)
	})

	app.Listen(":3000")
}
