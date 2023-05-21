import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "./LoginForm";
import PrivateScreen from "./PrivateScreen";
import * as LocalAuthentication from "expo-local-authentication";

const Stack = createNativeStackNavigator();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const handleFingerprintAuth = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            if (hasHardware) {
                const isEnrolled = await LocalAuthentication.isEnrolledAsync();
                if (isEnrolled) {
                    const result =
                        await LocalAuthentication.authenticateAsync();
                    if (result.success) {
                        handleLogin(); // Autenticação bem-sucedida
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
                    <Stack.Screen name="LoginForm" options={{ title: "Login" }}>
                        {() => (
                            <LoginForm
                                handleLogin={handleLogin}
                                handleFingerprintAuth={handleFingerprintAuth}
                                setIsAuthenticated={setIsAuthenticated}
                            />
                        )}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen
                        name="PrivateScreen"
                        options={{ title: "Private Screen" }}
                    >
                        {() => <PrivateScreen handleLogout={handleLogout} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
