// PrivateScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const PrivateScreen = ({ handleLogout }) => {
    const handleLogoutPress = () => {
        // Lógica de logout aqui
        // Definir o estado de autenticação como falso
        handleLogout();
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                marginTop: -200,
            }}
        >
            <Text style={{ marginBottom: 10 }}>Private Screen</Text>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>admin</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>admin@example.com</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>123-456-7890</Text>
                {/* Adicione outras informações do usuário aqui */}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogoutPress}>
                <FontAwesome name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "#f0f0f0",
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    value: {
        marginBottom: 10,
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: "center",
    },
});

export default PrivateScreen;
