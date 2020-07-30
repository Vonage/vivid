#!/bin/bash

set -e

generators=`find design-tokens/mixinsConfigurations/configurations -name "*.js"`

for generator in ${generators[@]}; do
	echo ${generator}
	node design-tokens/mixinsConfigurations/buildMixin.js --generatorFile ${generator}
done
