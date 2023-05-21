import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ClimaDetalhes({ dadosDeClima }) {
    const navigation = useNavigation();

    if (!dadosDeClima || !dadosDeClima.name) {
        return (
            <View style={styles.container}>
                <Text style={styles.cidade}>Cidade não encontrada</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.cidade}>{dadosDeClima.name}</Text>
            <Text style={styles.resultadoTexto}>
                Temperatura: {(dadosDeClima.main.temp - 273.15).toFixed(0)}°C
            </Text>
            <Text style={styles.resultadoTexto}>
                Temperatura mínima:{" "}
                {(dadosDeClima.main.temp_min - 273.15).toFixed(0)}°C
            </Text>
            <Text style={styles.resultadoTexto}>
                Temperatura máxima:{" "}
                {(dadosDeClima.main.temp_max - 273.15).toFixed(0)}°C
            </Text>
            <Text style={styles.resultadoTexto}>
                Pressão: {dadosDeClima.main.pressure} hPa
            </Text>
            <Text style={styles.resultadoTexto}>
                Umidade: {dadosDeClima.main.humidity}%
            </Text>
            <Text style={styles.resultadoTexto}>
                Velocidade do vento: {dadosDeClima.wind.speed} m/s
            </Text>
            <Text style={styles.resultadoTexto}>
                Direção do vento: {dadosDeClima.wind.deg}°
            </Text>
            <Text style={styles.resultadoTexto}>
                Descrição: {dadosDeClima.weather[0].description}
            </Text>
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
    cidade: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    resultadoTexto: {
        fontSize: 20,
        marginBottom: 10,
    },
    botaoVoltar: {
        backgroundColor: "#2196F3",
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    textoBotaoVoltar: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ClimaDetalhes;
