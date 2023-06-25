import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import LoginForm from "./LoginForm";
import HomeAdmin from "./HomeAdmin";
import HomeUser from "./HomeUser";

const Stack = createNativeStackNavigator();

const App = () => {
  // Estado para armazenar o tipo de usuário (admin ou user)
  const [userType, setUserType] = useState("");
  // Estado para verificar se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para realizar o login
  const handleLogin = async (username, password) => {
    if (username === "admin" && password === "admin") {
      // Define o tipo de usuário como admin e autenticação como verdadeira
      setUserType("admin");
      setIsAuthenticated(true);
    } else if (username === "user" && password === "user") {
      // Define o tipo de usuário como user e autenticação como verdadeira
      setUserType("user");
      setIsAuthenticated(true);
    } else {
      console.log("Credenciais inválidas");
    }
  };

  // Função para realizar o logout
  const handleLogout = async () => {
    // Limpa o tipo de usuário e a autenticação
    setUserType("");
    setIsAuthenticated(false);
    try {
      // Remove as credenciais do AsyncStorage ao fazer logout
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("password");
    } catch (error) {
      console.log("Erro ao remover as credenciais:", error);
    }
  };

  // Função para autenticar com impressão digital
  const handleFingerprintAuth = async () => {
    try {
      // Verifica se o dispositivo possui hardware para impressão digital
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (hasHardware) {
        // Verifica se existem impressões digitais registradas no dispositivo
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (isEnrolled) {
          // Realiza a autenticação com impressão digital
          const result = await LocalAuthentication.authenticateAsync();
          if (result.success) {
            handleLogin("admin", "admin"); // Autenticação bem-sucedida
          }
        } else {
          console.log(
            "O dispositivo não possui impressões digitais registradas."
          );
        }
      } else {
        console.log(
          "O dispositivo não possui suporte para autenticação biométrica."
        );
      }
    } catch (error) {
      console.log("Erro ao autenticar com impressão digital:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          // Tela de login
          <Stack.Screen name="LoginForm" options={{ title: "Login" }}>
            {() => (
              <LoginForm
                handleLogin={handleLogin}
                handleFingerprintAuth={handleFingerprintAuth}
              />
            )}
          </Stack.Screen>
        ) : userType === "admin" ? (
          // Tela principal do admin
          <Stack.Screen name="HomeAdmin" options={{ title: "Admin Home" }}>
            {(props) => (
              <HomeAdmin
                {...props}
                handleLogout={handleLogout}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
          </Stack.Screen>
        ) : userType === "user" ? (
          // Tela principal do usuário
          <Stack.Screen name="HomeUser" options={{ title: "User Home" }}>
            {(props) => (
              <HomeUser
                {...props}
                handleLogout={handleLogout}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
          </Stack.Screen>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
