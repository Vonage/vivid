#!/bin/sh

set -e

sassfiles=(`find components common -name "*.scss"`)

for sassfile in ${sassfiles[@]}; do
  # skip partials
  if [[ `basename ${sassfile}` =~ ^_ ]]; then
    continue
  fi
  cssts=`echo ${sassfile} | sed -e 's/.scss/.css.ts/'`
  lastdir=`basename $(dirname ${cssts})`
  # skip sass files outside of src folders
  if [[ ${lastdir} != "src" ]]; then
    continue
  fi
  echo "Generating ${cssts}"
  node scripts/sass-render/bin/sass-render.js -t sass-template.tmpl -s ${sassfile} -o ${cssts}
done
