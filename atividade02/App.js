import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import HomeScreen from "./src/components/HomeScreen";
import MediaScreen from "./src/components/MediaScreen";
import HelloWorldScreen from "./src/components/HelloWorldScreen";

export default function App() {
    const [screen, setScreen] = useState("home");

    const renderScreen = () => {
        switch (screen) {
            case "home":
                return <HomeScreen setScreen={setScreen} />;
            case "media":
                return <MediaScreen setScreen={setScreen} />;
            case "helloWorld":
                return <HelloWorldScreen setScreen={setScreen} />;
            default:
                return <HomeScreen setScreen={setScreen} />;
        }
    };

    return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
