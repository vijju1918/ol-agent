ENV=$1
release=$2

input="./$ENV"
prefix="GOOGLE_API_KEY_ANDROID="
while IFS= read -r line
do
    if [[ $line =~ $prefix ]]; then
        # export $line
        API_KEY="${line#"$prefix"}"
        # echo "$line"
        # export $EXPORT_KEY
    fi
done < "$input"

export RNGP_ANDROID_API_KEY="$API_KEY"

if [[ "$release" == 'bundleStagingRelease' ]]; then
    cd android
    ./gradlew bundleStagingRelease
elif [[ "$release" == 'bundleProdRelease' ]]; then
    cd android
    ./gradlew bundleProdRelease
else
    npx react-native run-android --variant "$release"
fi
