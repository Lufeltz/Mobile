import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = ({ handleLogin, handleFingerprintAuth }) => {
  // Estados para armazenar o username e a password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkPreviousLogin = async () => {
      try {
        // Verificar se há credenciais de login armazenadas no AsyncStorage
        const storedUsername = await AsyncStorage.getItem("username");
        const storedPassword = await AsyncStorage.getItem("password");

        if (storedUsername && storedPassword) {
          // Realizar o login com as credenciais armazenadas
          handleLogin(storedUsername, storedPassword);
        }
      } catch (error) {
        console.log("Erro ao verificar o login anterior:", error);
      }
    };

    checkPreviousLogin();
  }, []);

  const handleLoginPress = async () => {
    try {
      // Armazenar as credenciais de login no AsyncStorage
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);

      // Realizar o login com as credenciais inseridas pelo usuário
      handleLogin(username, password);
    } catch (error) {
      console.log("Erro ao armazenar as credenciais:", error);
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
        style={{
          marginBottom: 10,
          width: 200,
          height: 35,
          padding: 5,
        }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{
          marginBottom: 10,
          width: 200,
          height: 35,
          padding: 5,
        }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <FontAwesome name="unlock-alt" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFingerprintAuth}>
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
