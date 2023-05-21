import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import obterDadosDeClima from "./obterDadosDeClima";
import { useNavigation } from "@react-navigation/native";

function Clima() {
    const [cidade, setCidade] = useState("");
    const navigation = useNavigation();

    async function handlePress() {
        const dadosDeClima = await obterDadosDeClima(cidade);
        handleNavigation(dadosDeClima);
    }

    function handleNavigation(dadosDeClima) {
        navigation.navigate("ClimaDetalhes", { dadosDeClima });
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setCidade(text)}
                value={cidade}
                placeholder="Digite o nome da cidade"
                placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>CLIMA ATUAL</Text>
            </TouchableOpacity>
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
    textInput: {
        height: 50,
        width: "25%",
        borderBottomWidth: 1,
        borderColor: "#aaa",
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 20,
        outlineColor: "transparent",
    },
    button: {
        backgroundColor: "#1c8adb",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
    },
});

export default Clima;
