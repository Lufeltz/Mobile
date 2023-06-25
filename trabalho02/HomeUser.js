import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Componente de página inicial do usuário.
 * @param {Function} handleLogout - Função para lidar com o logout do usuário.
 */
const HomeUser = ({ handleLogout }) => {
  const [animalData, setAnimalData] = useState([]); // Estado para armazenar os dados dos animais
  const [expandedIndex, setExpandedIndex] = useState(null); // Estado para controlar o índice do item expandido
  const [updatedData, setUpdatedData] = useState({}); // Estado para armazenar os dados atualizados
  const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição dos dados

  useEffect(() => {
    fetchAnimalData();
  }, []);

  // Função assíncrona para buscar os dados dos animais armazenados.
  const fetchAnimalData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("animalData");
      const data = jsonValue != null ? JSON.parse(jsonValue) : [];
      setAnimalData(data);
    } catch (error) {
      console.error("Error fetching animal data:", error);
    }
  };

  /**
   * Função assíncrona para salvar os dados dos animais.
   * @param {Array} data - Dados dos animais a serem salvos.
   */
  const saveAnimalData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("animalData", jsonValue);
    } catch (error) {
      console.error("Error saving animal data:", error);
    }
  };

  /**
   * Função para alternar o estado de expansão de um item de animal.
   * @param {number} index - Índice do item de animal.
   */
  const toggleExpanded = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  //  Função para ativar o modo de edição dos dados de um animal.
  const handleUpdateData = () => {
    setEditMode(true);
  };

  /**
   * Função para salvar os dados atualizados de um animal.
   * @param {number} index - Índice do animal a ser atualizado.
   */
  const handleSaveData = (index) => {
    const updatedAnimals = [...animalData];
    const updatedAnimal = {
      ...updatedAnimals[index],
      characteristics: {
        ...updatedAnimals[index].characteristics,
        ...updatedData,
      },
    };
    updatedAnimals[index] = updatedAnimal;
    setAnimalData(updatedAnimals);
    setUpdatedData({});
    setEditMode(false);
    saveAnimalData(updatedAnimals);
  };

  //  Função para cancelar a atualização dos dados de um animal.
  const handleCancelUpdate = () => {
    setUpdatedData({});
    setEditMode(false);
  };

  /**
   * Função para lidar com a alteração de dados de um animal.
   * @param {string} key - Chave do dado a ser alterado.
   * @param {string} value - Novo valor do dado.
   */
  const handleChangeData = (key, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Home</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {animalData.map((animal, index) => (
          <View key={index} style={styles.animalItem}>
            <View style={styles.animalNameContainer}>
              <Text
                style={styles.animalName}
              >{`${animal.id}: ${animal.name}`}</Text>
              <TouchableOpacity
                style={styles.expandButton}
                onPress={() => toggleExpanded(index)}
              >
                {expandedIndex === index ? (
                  <Icon name="minus" size={30} color="#079850" />
                ) : (
                  <Icon name="plus" size={30} color="#079850" />
                )}
              </TouchableOpacity>
            </View>

            {expandedIndex === index && (
              <View style={styles.detailsContainer}>
                {Object.entries(animal.characteristics).map(([key, value]) => {
                  if (key !== "common_name" && key !== "group") {
                    return (
                      <View key={key} style={styles.detailItem}>
                        <Text style={styles.detailLabel}>{key}</Text>
                        {editMode ? (
                          <TextInput
                            style={styles.detailInput}
                            value={updatedData[key] || value}
                            onChangeText={(text) => handleChangeData(key, text)}
                          />
                        ) : (
                          <Text style={styles.detailValue}>{value}</Text>
                        )}
                      </View>
                    );
                  }
                })}

                {editMode ? (
                  <View style={styles.editButtonsContainer}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => handleSaveData(index)}
                    >
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancelUpdate}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={handleUpdateData}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#d52765",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  animalItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  animalNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  animalName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  expandButton: {
    padding: 5,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  detailLabel: {
    marginRight: 10,
    fontWeight: "bold",
  },
  detailInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  detailValue: {
    flex: 1,
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#079850",
    alignSelf: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#079850",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#d52765",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeUser;
