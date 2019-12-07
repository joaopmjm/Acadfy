#!/bin/sh

_service_file="acadfy.service"
if [ ! -f "$_service_file" ]; then
    echo "$_service_file not created. Please make the necessary changes to $_service_file.example and write the new file to $_service_file";
    exit 1;
fi

sudo cp acadfy.service /lib/systemd/system/acadfy.service;
sudo systemctl enable acadfy.service;
sudo systemctl start --now acadfy.service;
