import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const LoginForm = ({ handleLogin, handleFingerprintAuth }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginPress = () => {
        // Verificar as credenciais de login
        if (username === "admin" && password === "admin") {
            handleLogin(); // Autenticação bem-sucedida
        } else {
            console.log("Credenciais inválidas");
        }
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: -200,
            }}
        >
            <TextInput
                style={{ marginBottom: 10, width: 200, height: 35, padding: 5 }}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={{ marginBottom: 10, width: 200, height: 35, padding: 5 }}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                <FontAwesome name="unlock-alt" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={handleFingerprintAuth}
            >
                <MaterialIcons name="fingerprint" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: "center",
        marginBottom: 5,
    },
});

export default LoginForm;
