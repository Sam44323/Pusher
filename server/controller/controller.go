package controller

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/pusher/pusher-http-go"
)

func MessageHandler(c *fiber.Ctx, pusher *pusher.Client) error {
	fmt.Println("Message received")
	var message map[string]string
	err := c.BodyParser(&message)
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}
	pusher.Trigger("chat", "message", message)
	return c.JSON([]string{})
}
