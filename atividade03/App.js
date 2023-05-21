import React from "react";
import { View, StyleSheet } from "react-native";
import Gallery from "./Gallery";

export default function App() {
    return (
        <View style={styles.container}>
            <Gallery />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
