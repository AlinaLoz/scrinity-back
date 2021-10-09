#!/bin/bash

# Logout from Docker
docker logout
# Login in AWS container registry with your AWS credentials
aws ecr get-login-password --profile default  --region eu-west-1 | docker login --username AWS --password-stdin 343300559621.dkr.ecr.eu-west-1.amazonaws.com
