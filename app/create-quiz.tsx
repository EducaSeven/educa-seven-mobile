// import { Picker } from "@react-native-picker/picker";
import { Picker } from "react-native-wheel-pick";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
// import axios from "axios";

interface Pergunta {
  id: string;
  titulo: string;
  description: string;
}

export default function CreateQuiz() {
  const [providerPerguntas, setProviderPerguntas] = useState<any[]>([]);
  const [providerTablePerguntas, setProviderTablePerguntas] = useState<any[]>(
    []
  );
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizImage, setQuizImage] = useState("");
  const [perguntaSelecionada, setPerguntaSelecionada] = useState<any | null>(
    null
  );
  const [perguntaJaExiste, setPerguntaJaExiste] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const resp = (await axios.get("http://localhost:4000/pergunta/all")).data;
        // setProviderPerguntas(resp);
        const perguntas = [
          {
            value: "1",
            label: "Qual é a cor do céu?",
            description: "A cor do céu é azul.",
          },
          {
            value: "2",
            label: "Qual é a cor do sol?",
            description: "A cor do sol é amarelo.",
          },
          {
            value: "3",
            label: "Qual é a cor da grama?",
            description: "A cor da grama é verde.",
          },
          {
            value: "4",
            label: "Qual é a cor do fogo?",
            description: "A cor do fogo é vermelho.",
          },
        ];

        setProviderPerguntas(perguntas);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  function setPergunta(value: string) {
    const pergunta = providerPerguntas.find(
      (pergunta) => pergunta.value === value
    );
    if (pergunta) {
      setPerguntaSelecionada(pergunta);
    }
  }

  function onAdd() {
    if (perguntaSelecionada) {
      const perguntaJaAdicionada = providerTablePerguntas.find(
        (pergunta) => pergunta.value === perguntaSelecionada.value
      );
      if (!perguntaJaAdicionada) {
        setProviderTablePerguntas((prev) => [...prev, perguntaSelecionada]);
      } else {
        alert(perguntaJaAdicionada.id);
        setPerguntaJaExiste(true);
        Alert.alert("Aviso", "Pergunta já adicionada");
      }
    }
  }

  function onDeletePergunta(pergunta: any) {
    setProviderTablePerguntas((prev) =>
      prev.filter((q) => q.value !== pergunta.value)
    );
  }

  function onSubmit() {
    const perguntasId = providerTablePerguntas.map((pergunta) => pergunta.id);

    const newQuiz = {
      titulo: quizTitle,
      descricao: quizDescription,
      urlImageQuiz: quizImage,
      perguntas: perguntasId,
    };

    if (newQuiz.perguntas.length > 0) {
      //   axios.post("http://localhost:4000/quizzes/create", newQuiz).then(() => {
      //     Alert.alert("Sucesso", "Quiz criado com sucesso");
      //   });
    } else {
      Alert.alert("Erro", "Adicione pelo menos uma pergunta antes de salvar.");
    }
  }

  const router = useRouter();

  const onClose = () => {
    router.navigate("home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Criar novo quiz</Text>
        <Ionicons
          name="close-circle-outline"
          size={24}
          style={styles.closeIcon}
          onPress={onClose}
        />
      </View>

      <View style={styles.containerTitle}>
        <TextInput
          style={styles.inputTitle}
          placeholder="Título"
          value={quizTitle}
          placeholderTextColor="#aaa"
          onChangeText={setQuizTitle}
        />
        <TouchableOpacity style={styles.buttonPicker} onPress={pickImageAsync}>
          <Text style={styles.saveButtonTextPicker}>Escolher arquivo</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={quizDescription}
        placeholderTextColor="#aaa"
        onChangeText={setQuizDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={quizImage}
        placeholderTextColor="#aaa"
        onChangeText={setQuizImage}
      />

      <Button title="Adicionar Pergunta" onPress={onAdd} />

      <View style={styles.container}>
        <Picker
          style={{
            borderRadius: 8,
          }}
          selectedValue={perguntaSelecionada?.value}
          pickerData={providerPerguntas}
          onValueChange={setPergunta}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.titleTable}>Nome</Text>

        <FlatList
          style={{ marginTop: 8 }}
          data={providerTablePerguntas}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <View style={styles.questionRow}>
              <Text style={styles.pickerItem}>{item.label}</Text>
              <Button title="Excluir" onPress={() => onDeletePergunta(item)} />
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma pergunta adicionada</Text>
          }
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={onSubmit}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000",
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  inputTitle: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: "#333",
    color: "#fff",
    width: "60%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: "#333",
    color: "#fff",
    width: "100%",
  },

  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    color: "#fff",
    borderColor: "#444",
  },
  questionText: {
    color: "#fff",
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginVertical: 16,
  },
  saveButton: {
    backgroundColor: "#20DF7F",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
  },
  buttonPicker: {
    backgroundColor: "#20DF7F",
    paddingVertical: 8,
    marginBottom: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  saveButtonTextPicker: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "white",
    backgroundColor: "#333",
  },
  pickerItem: {
    color: "white",
    fontSize: 16,
  },
  titleTable: {
    color: "#fff",
    fontSize: 18,
    paddingLeft: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  closeIcon: {
    color: "white",
  },
});
