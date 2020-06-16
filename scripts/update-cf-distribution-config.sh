#!/bin/bash

# newOriginPath=\/$STORYBOOK_DEPLOY_VERSION
# echo newOriginPath
aws cloudfront get-distribution-config --id $AWS_CF_DISTRIBUTION_ID > cfd-config-source.json
jq 'del(.ETag)' cfd-config-source.json > cfd-config.tmp
jq --arg nv '/$STORYBOOK_DEPLOY_VERSION' '(.DistributionConfig.Origins.Items[0].OriginPath = $nv)' cfd-config.tmp > cfd-config.json
less cfd-config.json