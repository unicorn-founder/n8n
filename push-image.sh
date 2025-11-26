#!/bin/bash
set -euo pipefail

export IMAGE_NAME="unicornfounder/n8n"
export REGION="eu-central-1"
export ACCOUNT_ID="134755948527"
export ECR_REGISTRY="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com"
export ECR_REPO="${ECR_REGISTRY}/${IMAGE_NAME}"

aws ecr get-login-password --region "$REGION" \
  | docker login --username AWS --password-stdin "$ECR_REGISTRY"

docker push "${ECR_REPO}:latest"
