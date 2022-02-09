main() = {
    # Display Manager: load user list and login screen with default system config for wallpapers, themes, etc

    # kernel backend: wait/sleep for user to login. Check for correct password and find the user configs if done so
    # GUI is still running though since have to re-render mouse movements, animations, text, etc

    # load user config for logged in user

    # ArcWM: load DE with the user config, wallpapers, etc

    # load any startup apps

    # kernel backend: wait/sleep for user to open an app or do something that requires kernel services
}
