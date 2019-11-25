#!/bin/sh

sudo cp acadfy.service /lib/systemd/system/acadfy.service
sudo systemctl enable acadfy.service
sudo systemctl start --now acadfy.service
