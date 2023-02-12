# Automates PWA asset generation and image declaration according to Web App Manifest specs and Apple Human Interface guidelines.

# STEP 1 - Update source files
#   favicon -> ./public/img/appFavicon.svg
#   app icon -> ./public/img/appIcon.svg
#   splash light mode -> ./public/img/appLogoLight.svg
#   splash dark mode -> ./public/img/appLogoDark.svg
# STEP 2 - Update background colors
# STEP 3 - Update paddings

# Automatically generates icon and splash screen images, favicons and mstile images
npx pwa-asset-generator ./public/img/appFavicon.svg ./public/img --favicon --icon-only --type png --opaque false --padding 0
npx pwa-asset-generator ./public/img/appIcon.svg ./public/img --icon-only --type png --background "linear-gradient(135deg, #079FDB 0%, #0D89BA 100%)" --padding "25%"
npx pwa-asset-generator ./public/img/appLogoDark.svg ./public/img --splash-only --type png --background "linear-gradient(135deg, #079FDB 0%, #0D89BA 100%)" --padding "calc(50vh - 20%) calc(50vw - 30%)"

# Automatically generates icon and splash screen images, favicons and mstile images and updates manifest.json and index.html files
# npx pwa-asset-generator ./public/img/appIcon.svg ./public/img --index ./index.html --favicon --icon-only --type png --opaque false --padding 0
# npx pwa-asset-generator ./public/img/appIcon.svg ./public/img --index ./index.html --icon-only --manifest ./public/manifest.json --type png --background "linear-gradient(135deg, #F2F2F2 0%, #E6E6E6 100%)" --padding "25%"
# npx pwa-asset-generator ./public/img/appLogoDark.svg ./public/img --index ./index.html --splash-only --type png --background "linear-gradient(135deg, #F2F2F2 0%, #E6E6E6 100%)" --padding "calc(50vh - 20%) calc(50vw - 30%)"
# npx pwa-asset-generator ./public/img/appLogoLight.svg ./public/img  --dark-mode --index ./index.html --splash-only --type png --background "linear-gradient(135deg, #3b4c54 0%, #172226 100%)" --padding "calc(50vh - 20%) calc(50vw - 30%)"
