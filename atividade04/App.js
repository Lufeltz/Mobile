import React from "react";
import { StyleSheet, View } from "react-native";
import Clima from "./Clima";

export default function App() {
    return (
        <View style={styles.container}>
            <Clima />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginTop: -150,
    },
});
