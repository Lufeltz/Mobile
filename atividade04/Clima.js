import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import obterDadosDeClima from "./obterDadosDeClima";

function Clima() {
    const [cidade, setCidade] = useState("");
    const [dadosDeClima, setDadosDeClima] = useState(null);

    async function handleObterDadosDeClima() {
        try {
            const dados = await obterDadosDeClima(cidade);
            setDadosDeClima(dados);
        } catch (error) {
            console.log(error);
        }
    }

        return (
            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Digite a cidade"
                    value={cidade}
                    onChangeText={setCidade}
                />
                <Button
                    title="CLIMA ATUAL"
                    onPress={handleObterDadosDeClima}
                />
                {dadosDeClima && (
                    <View style={styles.resultadoContainer}>
                        <Text style={styles.resultadoTexto}>
                            Temperatura:{" "}
                            {(dadosDeClima.main.temp - 273.15).toFixed(0)}°C
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
                )}
            </View>
        );
    }

    const styles = StyleSheet.create({
        textInput: {
            marginBottom: 10,
            height: 50,
            width: "100%",
            fontSize: 20,
            borderBottomWidth: 2,
            borderColor: "blue",
            underlineColorAndroid: "transparent",
            outlineColor: "transparent",
            padding: 5,
        },
        resultadoContainer: {
            
            marginTop: 10,
            padding: 10,
            borderBottomWidth: 2,
            borderColor: "blue",
        },
        resultadoTexto: {
            fontSize: 18,
        },
    });

export default Clima;
