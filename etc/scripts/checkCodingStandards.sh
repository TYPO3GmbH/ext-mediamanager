#!/usr/bin/env bash

FILTERED_FOLDERS=`find ./ -mindepth 1 -maxdepth 1 -type d | grep -Ev 'Build|Resources|etc|public|logs|.phpspec|.git|vendor|.idea|var'`

if [ "0" != "$(echo $?)" ]; then
    echo "No php files found to lint. So technically spoken everything's fine, but please check that I haven't missed any files."
    exit 0
fi

SEPERATOR=" "
FOLDERS=$(printf "${SEPERATOR}%s" "${FILTERED_FOLDERS[@]}")

vendor/bin/ecs check --no-progress-bar -n -c etc/easy-coding-standard.yml $FOLDERS $@
