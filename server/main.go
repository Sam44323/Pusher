package main

//go:generate go run main.go

import (
	"fmt"
	"log"
	"os"

	Pusher "github.com/Sam44323/go-pusher/pusher"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")

	// initiating the pusher-client
	Pusher.Init()

	if err != nil {
		log.Fatal("Error loading .env file")
	}
	fmt.Printf("Starting server... %s", os.Getenv("DATA"))
	app := fiber.New()

	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Listen(":3000")
}
