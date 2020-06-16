#!/bin/bash

aws cloudfront get-distribution-config --id $AWS_CF_DISTRIBUTION_ID > cfd-config-source.json
less cfd-config-source.json
jq 'del(.ETag)' cfd-config-source.json > cfd-config.tmp
less cfd-config.json
jq '(.DistributionConfig | .Origins | .Items[] | .OriginPath = $newVal' --arg newVal $STORYBOOK_DEPLOY_VERSION cfd-config.tmp > cfd-config.json
less cfd-config.json