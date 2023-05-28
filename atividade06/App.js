import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons, Feather, Octicons } from "@expo/vector-icons";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("alunos.db");

export default function App() {
    const [nome, setNome] = useState("");
    const [nota1, setNota1] = useState("");
    const [nota2, setNota2] = useState("");
    const [media, setMedia] = useState("");
    const [alunos, setAlunos] = useState([]);
    const [exibirRegistros, setExibirRegistros] = useState(false);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, media REAL);"
            );
        });
    }, []);

    const carregarAlunos = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM alunos",
                [],
                (_, result) => {
                    const rows = result.rows;
                    const alunosArray = [];
                    for (let i = 0; i < rows.length; i++) {
                        alunosArray.push(rows.item(i));
                    }
                    setAlunos(alunosArray);
                },
                (_, error) => {
                    console.log("Erro ao carregar alunos:", error);
                }
            );
        });
    };

    const calcularMedia = () => {
        const n1 = parseFloat(nota1);
        const n2 = parseFloat(nota2);
        const mediaCalculada = (n1 + n2) / 2;
        setMedia(mediaCalculada.toFixed(2));
    };

    const salvarAluno = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO alunos (nome, media) VALUES (?, ?);",
                [nome, media],
                (_, result) => {
                    console.log("Aluno salvo com ID: " + result.insertId);
                    setNome("");
                    setNota1("");
                    setNota2("");
                    setMedia("");
                    carregarAlunos(); // Atualiza a lista de alunos após salvar
                },
                (_, error) => {
                    console.log("Erro ao salvar aluno:", error);
                }
            );
        });
    };

    const limparTabelaAlunos = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM alunos;",
                [],
                (_, result) => {
                    console.log("Tabela de alunos limpa com sucesso.");
                    carregarAlunos(); // Atualiza a lista de alunos após limpar a tabela
                },
                (_, error) => {
                    console.log("Erro ao limpar a tabela de alunos:", error);
                }
            );
        });
    };

    const alternarExibicaoRegistros = () => {
        setExibirRegistros(!exibirRegistros);
    };

    useEffect(() => {
        carregarAlunos();
    }, []);

    const renderRegistro = ({ item }) => (
        <Text key={item.id} style={styles.registros}>
            ID: {item.id}, Nome: {item.nome}, Média: {item.media}
        </Text>
    );

    return (
        <View style={styles.container}>
            <View style={styles.internalView}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do aluno"
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Primeira nota"
                    keyboardType="numeric"
                    value={nota1}
                    onChangeText={(text) => setNota1(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Segunda nota"
                    keyboardType="numeric"
                    value={nota2}
                    onChangeText={(text) => setNota2(text)}
                />
                <TouchableOpacity style={styles.button} onPress={calcularMedia}>
                    <View style={styles.buttonContent}>
                        <Octicons name="number" style={styles.icon} />
                        <Text style={styles.buttonText}>Calcular Média</Text>
                    </View>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Média"
                    value={media}
                    editable={false}
                />

                <TouchableOpacity style={styles.button} onPress={salvarAluno}>
                    <View style={styles.buttonContent}>
                        <Feather name="save" style={styles.icon} />
                        <Text style={styles.buttonText}>Salvar Aluno</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={limparTabelaAlunos}
                >
                    <View style={styles.buttonContent}>
                        <MaterialIcons
                            name="cleaning-services"
                            style={styles.icon}
                        />
                        <Text style={styles.buttonText}>Limpar Tabela</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={alternarExibicaoRegistros}
                >
                    <View style={styles.buttonContent}>
                        <Ionicons
                            name={exibirRegistros ? "eye-off" : "eye"}
                            style={styles.icon}
                        />
                        <Text style={styles.buttonText}>
                            {exibirRegistros ? "Registros" : "Registros"}
                        </Text>
                    </View>
                </TouchableOpacity>

                {exibirRegistros && (
                    <View style={styles.registrosContainer}>
                        <FlatList
                            data={alunos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderRegistro}
                            style={styles.registrosList}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    internalView: {
        borderWidth: 2,
        borderColor: "#007AFF",
        padding: 25,
        borderRadius: 5,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: 200,
        textAlign: "center",
        borderRadius: 5,
    },
    registros: {
        marginTop: 10,
    },
    registrosContainer: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },
    registrosList: {
        flex: 1,
    },
    button: {
        width: 200,
        marginBottom: 10,
        backgroundColor: "#007AFF",
        borderRadius: 5,
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 36,
    },
    icon: {
        marginRight: 5,
        color: "#fff",
        fontSize: 24,
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
    },
});
