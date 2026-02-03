param(
    [switch]$ci
)
if ($ci) {
    npm ci
}

npm run build
npx firebase deploy --only hosting
