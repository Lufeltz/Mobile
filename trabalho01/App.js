import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import obterDadosDeClima from "./obterDadosDeClima";
import Clima from "./Clima";
import ClimaDetalhes from "./ClimaDetalhes";

const Stack = createStackNavigator();

export default function App() {
    const [dadosDeClima, setDadosDeClima] = useState(null);

    async function handleDadosDeClima(valorDeReferencia) {
        const dados = await obterDadosDeClima(valorDeReferencia);
        setDadosDeClima(dados);
    }

    function handleVoltar() {
        setDadosDeClima(null);
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    options={{ title: "Trabalho 1" }}
                    children={({ navigation }) => (
                        <View style={{ flex: 1 }}>
                            <Home
                                dadosDeClima={dadosDeClima}
                                navigation={navigation}
                            />
                        </View>
                    )}
                />
                <Stack.Screen
                    name="Clima"
                    options={{ title: "API Clima" }}
                    children={() => (
                        <Clima onDadosDeClima={handleDadosDeClima} />
                    )}
                />
                <Stack.Screen
                    name="ClimaDetalhes"
                    options={{ title: "Detalhes do Clima" }}
                    children={({ route, navigation }) => (
                        <ClimaDetalhes
                            dadosDeClima={route.params.dadosDeClima}
                            navigation={navigation}
                            onVoltar={handleVoltar}
                        />
                    )}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    botao: {
        position: "absolute",
        bottom: 20,
        left: 20,
        backgroundColor: "#6495ED",
        borderRadius: 10,
        padding: 10,
    },
    botaoTexto: {
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
});
