import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function HomeScreen({ setScreen }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Page</Text>
            <View style={{ width: 150 }}>
                <Button
                    title="Calcular Média"
                    onPress={() => setScreen("media")}
                    color="blue"
                />
            </View>
            <View style={{ marginTop: 20, width: 150 }}>
                <Button
                    title="Hello World"
                    onPress={() => setScreen("helloWorld")}
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
    title: {
        fontSize: 30,
        marginBottom: 30,
    },
});
