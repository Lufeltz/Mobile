import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Home(props) {
    const { navigation } = props;

    function handlePress() {
        navigation.navigate("Clima");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trabalho 1</Text>
            <Text style={styles.subtitle}>Consumo de API de Clima</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>API CLIMA</Text>
            </TouchableOpacity>
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
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 50,
    },
    button: {
        backgroundColor: "#1c8adb",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});
