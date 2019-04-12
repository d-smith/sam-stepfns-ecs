## Prerequisites

1. Install the step functions state machine
2. Create you ECR repositories and push the worker images
3. Create a stage bucket for the cloud formation templates

## Installation

1. Copy the cloud formation templates to your staging bucket
2. Instantiate the stack

```console
aws s3 cp . s3://code97068/fg/ --exclude "*" --include "*.yml" --recursive
aws cloudformation create-stack \
--stack-name far-step \
--template-body file://fgstack.yml \
--parameters ParameterKey=BucketRoot,ParameterValue=https://s3.amazonaws.com/code97068/fg \
--capabilities CAPABILITY_IAM