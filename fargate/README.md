## Prerequisites

1. Install the step functions state machine
2. Create you ECR repositories and push the worker images
3. Create a stage bucket for the cloud formation templates

### ECR Setup

To create the ECR respository:

```console
aws ecr create-repository --repository-name stepfn-task
```

Container push:

```console
`aws ecr get-login --no-include-email`
docker tag stepz/sm1-step1-worker nnnn.dkr.ecr.us-east-1.amazonaws.com/stepz/sm1-step1-worker
docker push nnnn.dkr.ecr.us-east-1.amazonaws.com/stepz/sm1-step1-worker
```

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
```

## Run a Task

List tasks

```console
aws ecs list-task-definitions
```

List clusters

```console
aws ecs list-clusters
```

Run it

```console
aws ecs run-task --task-definition arn:aws:ecs:us-east-1:nnnn:task-definition/step-fn-tasks:1 \
 --cluster arn:aws:ecs:us-east-1:nnnn:cluster/far-step-Fargate-1UFKEO406KYW6-FGCluster-1JRWDCKEPZA1L \
 --network-configuration 'awsvpcConfiguration={subnets=[subnet-08405970c9799b2b8,subnet-09d36ecc61d529931],securityGroups=[sg-0c6ffdc6652caf6ab]}' \
 --launch-type FARGATE
```

Get the status

```console
aws ecs describe-tasks --tasks arn:aws:ecs:us-east-1:nnnn:task/53b6c181-bb59-4276-8965-d6797f86a055
```


