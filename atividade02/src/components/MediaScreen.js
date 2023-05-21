import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";

export default function MediaScreen({ setScreen }) {
    const [nota1, setNota1] = useState("");
    const [nota2, setNota2] = useState("");
    const [media, setMedia] = useState("");

    const calcularMedia = () => {
        if (!nota1 || !nota2) {
            return;
        }

        const nota1Float = parseFloat(nota1);
        const nota2Float = parseFloat(nota2);

        if (isNaN(nota1Float) || isNaN(nota2Float)) {
            return;
        }

        const media = (nota1Float + nota2Float) / 2;
        setMedia(media.toFixed(2));
    };

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
    input: {
        height: 40,
        width: 300,
        borderWidth: 1,
        borderColor: "blue",
        marginTop: 20,
        paddingHorizontal: 10,
    },
});
