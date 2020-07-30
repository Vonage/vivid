#!/bin/bash

set -e

generators=`find common/design-tokens/mixinsConfigurations/configurations -name "*.js"`

for generator in ${generators[@]}; do
	node common/design-tokens/mixinsConfigurations/buildMixin.js --generatorFile ${generator}
done
