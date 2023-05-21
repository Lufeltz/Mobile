import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button, Alert } from "react-native";

export default function App() {
    const [nota1, setNota1] = useState("");
    const [nota2, setNota2] = useState("");
    const [media, setMedia] = useState("");

    const calcularMedia = () => {
        if (!isNumeric(nota1) || !isNumeric(nota2)) {
            return;
        }

        const media = (parseFloat(nota1) + parseFloat(nota2)) / 2;
        setMedia(media.toFixed(2));
    };

    const isNumeric = (value) => {
        return /^\d+$/.test(value);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite a primeira nota"
                keyboardType="numeric"
                value={nota1}
                onChangeText={setNota1}
            />

            <TextInput
                style={styles.input}
                placeholder="Digite a segunda nota"
                keyboardType="numeric"
                value={nota2}
                onChangeText={setNota2}
            />

            <View style={{ marginTop: 20 }}>
                <Button
                    title="Calcular Média"
                    onPress={() => calcularMedia()}
                    color="blue"
                />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Média das notas"
                editable={false}
                value={media}
            />
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
    input: {
        height: 40,
        width: "25%",
        borderWidth: 1,
        borderColor: "blue",
        marginTop: 20,
        paddingHorizontal: 10,
    },
});
