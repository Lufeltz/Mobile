import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnimals } from "./Api";

const HomeAdmin = ({ handleLogout }) => {
  // Estado para o nome do animal
  const [animalName, setAnimalName] = useState("");
  // Estado para os dados dos animais
  const [animalData, setAnimalData] = useState([]);
  // Estado para controlar o índice do animal expandido
  const [expandedIndex, setExpandedIndex] = useState(null);
  // Estado para os dados atualizados do animal
  const [updatedData, setUpdatedData] = useState({});
  // Estado para controlar o modo de edição
  const [editMode, setEditMode] = useState(false);
  // Estado para o próximo ID incremental
  const [nextId, setNextId] = useState(1);

  // Carrega os dados dos animais ao montar o componente
  useEffect(() => {
    loadAnimalData();
  }, []);

  // Função para carregar os dados dos animais do AsyncStorage
  const loadAnimalData = async () => {
    try {
      const storedAnimalData = await AsyncStorage.getItem("animalData");
      if (storedAnimalData) {
        setAnimalData(JSON.parse(storedAnimalData));
      }
    } catch (error) {
      console.error("Error loading animal data:", error);
    }
  };

  // Função para salvar os dados dos animais no AsyncStorage
  const saveAnimalData = async (data) => {
    try {
      await AsyncStorage.setItem("animalData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving animal data:", error);
    }
  };

  // Função para buscar os dados do animal da API
  const fetchAnimalData = async () => {
    try {
      const response = await getAnimals(animalName);

      if (response && response.length > 0) {
        // Atualiza os dados dos animais com os dados obtidos da API
        const updatedData = [
          ...animalData,
          {
            id: nextId,
            name: response[0].name,
            characteristics: response[0].characteristics,
          },
        ];
        setAnimalData(updatedData);
        saveAnimalData(updatedData);
        // Incrementa o próximo ID
        setNextId((prevId) => prevId + 1);
      } else {
        console.log("Animal not found");
      }
    } catch (error) {
      console.error("Error fetching animal data:", error);
    }
  };

  // Manipulador de evento para adicionar um animal
  const handleAddAnimal = () => {
    fetchAnimalData();
  };

  // Função para alternar a expansão do animal
  const toggleExpanded = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Manipulador de evento para atualizar os dados do animal
  const handleUpdateData = () => {
    setEditMode(true);
  };

  // Manipulador de evento para salvar os dados atualizados do animal
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

  // Manipulador de evento para cancelar a atualização dos dados do animal
  const handleCancelUpdate = () => {
    setUpdatedData({});
    setEditMode(false);
  };

  // Manipulador de evento para alterar os dados atualizados do animal
  const handleChangeData = (key, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Manipulador de evento para excluir um animal
  const handleDeleteAnimal = (index) => {
    const updatedAnimals = [...animalData];
    updatedAnimals.splice(index, 1);
    setAnimalData(updatedAnimals);
    saveAnimalData(updatedAnimals);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Home</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter animal name"
          value={animalName}
          onChangeText={setAnimalName}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddAnimal}>
          <Text style={styles.buttonText}>Add</Text>
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
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteAnimal(index)}
              >
                <Icon name="trash" size={30} color="#d52765" />
              </TouchableOpacity>
            </View>

            {expandedIndex === index && (
              <View style={styles.detailsContainer}>
                {Object.entries(animal.characteristics).map(([key, value]) => {
                  if (key !== "common_name" && key !== "group") {
                    return (
                      <View key={key} style={styles.editableField}>
                        <Text style={styles.fieldName}>{key}: </Text>
                        {editMode ? (
                          <TextInput
                            style={styles.inputField}
                            value={updatedData[key] || value}
                            onChangeText={(text) => handleChangeData(key, text)}
                          />
                        ) : (
                          <Text style={styles.fieldValue}>{value}</Text>
                        )}
                      </View>
                    );
                  }
                })}
                {editMode ? (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => handleSaveData(index)}
                    >
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancelUpdate}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={handleUpdateData}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
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
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#d52765",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#079850",
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  animalItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  animalNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  animalName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  expandButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  editableField: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  fieldName: {
    fontWeight: "bold",
    marginRight: 5,
  },
  fieldValue: {
    flex: 1,
  },
  inputField: {
    flex: 1,
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#079850",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#d52765",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#079850",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default HomeAdmin;
