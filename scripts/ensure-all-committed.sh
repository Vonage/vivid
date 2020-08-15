#!/bin/bash

if git status --untracked-files=no --porcelain | grep -v 'autogenerated\.js$'; then
		echo Not all autogenerated files committed!!!;
    exit 1;
else
    exit 0;
fi