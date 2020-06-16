#!/bin/bash

aws cloudfront get-distribution-config --id $AWS_CF_DISTRIBUTION_ID > cfd_config.json
less cfd_config.json
jq --version
echo $STORYBOOK_DEPLOY_VERSION