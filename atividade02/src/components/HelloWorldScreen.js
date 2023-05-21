import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function HelloWorldScreen({ setScreen }) {
    return (
        <View style={styles.container}>
            <Text>Hello World!</Text>
            <View style={{ marginTop: 20, width: 150 }}>
                <Button
                    title="Voltar"
                    onPress={() => setScreen("home")}
                    color="blue"
                />
            </View>
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
