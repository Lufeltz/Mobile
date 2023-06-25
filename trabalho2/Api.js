import axios from "axios";

const apiKey = "KiXqRpW0VI1z7Fu9yum0XA==TyuE8fuCzJPdqUub";

/**
 * Obtém os animais com base no nome do animal.
 *
 * @param {string} animal - Nome do animal.
 * @returns {Promise} - Promise resolvida com os dados dos animais ou rejeitada com o erro.
 */
export const getAnimals = async (animal) => {
  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/animals?name=${animal}`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter os animais:", error);
    throw error;
  }
};
