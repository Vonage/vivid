#!/bin/bash

aws cloudfront get-distribution-config --id $AWS_CF_DISTRIBUTION_ID > cfd-config-source.json
less cfd-config-source.json
jq 'del(.ETag)' cfd-config-source.json > cfd-config.tmp
less cfd-config.tmp
jq '(.DistributionConfig | .Origins | .Items[] | .OriginPath = "/$STORYBOOK_DEPLOY_VERSION")' cfd-config.tmp > cfd-config.json
less cfd-config.json