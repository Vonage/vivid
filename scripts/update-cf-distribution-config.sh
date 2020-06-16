#!/bin/bash

aws cloudfront get-distribution-config --id $AWS_CF_DISTRIBUTION_ID > cfd-config-source.json
AWS_CF_DISTRIBUTION_ETAG=$(jq -r '.ETAG' cfd-config-source.json)
echo $AWS_CF_DISTRIBUTION_ETAG

#jq 'del(.ETag)' cfd-config-source.json > cfd-config.tmp
#jq --arg nv "/$STORYBOOK_DEPLOY_VERSION" '(.DistributionConfig | .Origins.Items[0].OriginPath = $nv)' cfd-config.tmp > cfd-config.json
#aws cloudfront update-distribution --id $AWS_CF_DISTRIBUTION_ID --distribution-config file://cfd-config.json --if-match $AWS_CF_DISTRIBUTION_ETAG