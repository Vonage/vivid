#!/bin/bash

aws cloudfront get-distribution-config --id $AWS_CF_DISTRIBUTION_ID > cfd-config-source.json
jq 'del(.ETag)' cfd-config-source.json > cfd-config.tmp
jq --arg nv "/$STORYBOOK_DEPLOY_VERSION" '(.DistributionConfig.Origins.Items[0].OriginPath = $nv)' cfd-config.tmp > cfd-config.json
aws cloudfront update-distribution --id $AWS_CF_DISTRIBUTION_ID --distribution-config cfd-config.json