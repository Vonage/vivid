#!/bin/bash

set -e

generators=`find design-tokens/sassGenerators -name "*.js"`

for generator in ${generators[@]}; do
	node scripts/buildMixin.js --generatorFile ${generator}
done
