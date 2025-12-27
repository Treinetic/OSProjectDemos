#!/bin/bash

# fist do 
# docker login -u <username>
# before you run this

# Define image name
IMAGE_NAME="treineticprojects/demo_opensource:latest"

# Build the Docker image
echo "Building Docker image: $IMAGE_NAME..."
docker build -t $IMAGE_NAME .
# Push the Docker image
echo "Pushing Docker image: $IMAGE_NAME..."
docker push $IMAGE_NAME

echo "Done!"
