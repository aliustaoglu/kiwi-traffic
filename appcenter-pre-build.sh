#!/usr/bin/env bash
echo "Kiwi Traffic is PreBuilding"

echo "$APPCENTER_BUILD_ID"
echo "$APPCENTER_BRANCH"
echo "$APPCENTER_SOURCE_DIRECTORY"
echo "$APPCENTER_OUTPUT_DIRECTORY"
echo "$APPCENTER_TRIGGER"

# https://github.com/luggit/react-native-config/issues/282#!/usr/bin/env bash
# Creates an .env from ENV variables for use with react-native-dotenv
echo '' > .env
