# Install On Phone

## Best path right now

This project is now a PWA, which means Android can install it like an app with:

- its own home-screen icon
- standalone full-screen launch
- offline loading
- local data saved on that device

## To install on Android

1. Put this folder on an HTTPS static host.
2. Open the site on your phone in Chrome.
3. Tap `Install App` if Chrome shows it.
4. If Chrome does not show the button, open the browser menu and choose `Add to Home screen`.

## Good hosting options

- GitHub Pages
- Netlify
- Vercel

## Important note

Opening `index.html` directly as a local file on the phone will not behave like a full installable app, because install prompts and service workers need HTTPS or localhost.

## APK status

A real Android APK was not built in this workspace because the local machine does not currently have the Android SDK installed.

If you want, the next step can be:

- install Android SDK tools here and package this as an APK
- wrap this PWA in an Android WebView app
- publish it privately for your own phone use
