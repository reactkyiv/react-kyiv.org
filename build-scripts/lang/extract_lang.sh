#!/bin/bash


pushd `dirname $0` > /dev/null;
ROOT_DIR=`pwd`'/../..';
popd > /dev/null;

IFS=$'\n' read -r -d '' -a locales < ${ROOT_DIR}/build-scripts/lang/supportedLocales.txt  # read into an array

# Transpile to ES5
node "${ROOT_DIR}/node_modules/babel-cli/bin/babel" "${ROOT_DIR}/src" -d "${ROOT_DIR}/src_es5";
find "${ROOT_DIR}/src_es5" -type f \( -name '*.js' \) -print > "${ROOT_DIR}/list";

pathToMessages=${ROOT_DIR}/build-scripts/lang/locales/po/messages.pot

# Extract phrases from source code and update exising PO files
xgettext --keyword="l:1" \
         --keyword="l:1,2c" \
         --keyword="nl:1,2" \
         --keyword="nl:1,2,4c" \
         --files-from="${ROOT_DIR}/list" \
         --language=JavaScript \
         --no-location \
         --from-code=UTF-8 \
         --output="${pathToMessages}";

for locale in "${locales[@]}"
do
   :
   path=${ROOT_DIR}/build-scripts/lang/locales/po/$locale.po;
   [ -f ${path} ] && msgmerge --backup=off -U "${path}" "${pathToMessages}" ||
   cat ${ROOT_DIR}/build-scripts/lang/locales/base.po > "${path}" && msgmerge --backup=off -U "${path}" "${pathToMessages}";
done

# Cleanup
rm -rf "${ROOT_DIR}/src_es5";
rm -rf "${ROOT_DIR}/list";

