#!/bin/bash

pushd `dirname $0` > /dev/null;
ROOT_DIR=`pwd`'/../..';
popd > /dev/null;

IFS=$'\n' read -r -d '' -a locales < ${ROOT_DIR}/build-scripts/lang/supportedLocales.txt  # read into an array

for locale in "${locales[@]}"
do
   :
   path=${ROOT_DIR}/build-scripts/lang/locales/po/${locale}.po
   newPath=${ROOT_DIR}/static/locales/json/${locale}
   [ -f ${path} ] && node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${path}" -f jed1.x -p "${newPath}.json" || echo "Run extract_lang.sh first" ;
done
