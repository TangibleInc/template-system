#!/usr/bin/env bash
set -eou pipefail

#
# Ensure unique namespace by replacing ScssPhp\ScssPhp with Tangible\ScssPhp
#
# This is necessary because PHP and Composer don't support different versions
# of the same module.
#

main() {

  local OS
  local CURRENT_FOLDER="scssphp"
  OS="$(uname)"

  namespace-files() {

    echo "Folder: $CURRENT_FOLDER"
    local RESTORE_FOLDER="$CURRENT_FOLDER"

    for file in *.php; do

      echo "  File: $file";

      if [ "$OS" == "Darwin" ]; then
        # macOS-specific options for sed
        # @see https://stackoverflow.com/questions/5694228/sed-in-place-flag-that-works-both-on-mac-bsd-and-linux#22084103
        sed -i '' -e 's/namespace\ ScssPhp\\/namespace\ Tangible\\/g' "$file"
        sed -i '' -e 's/use\ ScssPhp\\/use\ Tangible\\/g' "$file"
      else
        # Linux or WSL2 - Windows Subsystem for Linux
        sed -i -e 's/namespace\ ScssPhp\\/namespace\ Tangible\\/g' "$file"
        sed -i -e 's/use\ ScssPhp\\/use\ Tangible\\/g' "$file"
      fi
    done

    for folder in *; do
      if [ -d "$folder" ]; then

        CURRENT_FOLDER="$RESTORE_FOLDER/$folder"

        cd "$folder"
        namespace-files
        cd ..
      fi
    done

    CURRENT_FOLDER="$RESTORE_FOLDER"
  }

  cd scssphp

  namespace-files

  cd ..  
}

main
