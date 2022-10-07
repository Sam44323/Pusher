package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pusher/pusher-http-go"
)

func MessageHandler(c *fiber.Ctx, pusher *pusher.Client) error {
	var message map[string]string
	err := c.BodyParser(&message)
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}
	pusher.Trigger("chat", "message", message)
	return c.JSON(
		fiber.Map{
			"message": "Message sent",
		})
}
