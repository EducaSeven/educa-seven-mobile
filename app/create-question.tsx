import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Props {
  pergId: string;
  pergTitle: string;
  pergDescription: string;
  respostas: Resposta[];
  titleForms: string;
  modal: boolean;
  tipo: "create" | "update";
  onClose: () => void;
}

interface Pergunta {
  id: string;
  titulo: string;
  description: string;
  respostas: Resposta[];
}

interface Resposta {
  id: string;
  description: string;
  resultado: boolean;
}

export default function CreateQuestion() {
  const [pergunta, setPergunta] = React.useState({
    titulo: "",
    description: "",
  });
  const [respostas, setRespostas] = React.useState([
    { description: "", resultado: false },
    { description: "", resultado: false },
    { description: "", resultado: false },
    { description: "", resultado: false },
  ]);

  const router = useRouter();

  const [props, setProps] = React.useState<Props>({
    pergId: "",
    pergTitle: "",
    pergDescription: "",
    respostas: [],
    titleForms: "",
    modal: false,
    tipo: "create",
    onClose: () => {},
  });

  const handleRespostaChange = (index: any, value: any) => {
    const updatedRespostas = [...respostas];
    updatedRespostas[index].description = value;
    setRespostas(updatedRespostas);
  };

  const handleRespostaCheckboxChange = (index: any) => {
    const updatedRespostas = [...respostas];
    updatedRespostas[index].resultado = !updatedRespostas[index].resultado;
    setRespostas(updatedRespostas);
  };

  const onSubmit = () => {
    console.log("Submitted:", pergunta, respostas);
  };

  const onClose = () => {
    router.navigate("home");
  };

  return (
    <ScrollView
      style={[styles.container, props.modal ? {} : styles.fullWidth]}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {props.pergId ? "Editar pergunta" : "Criar pergunta"}
        </Text>
        <Ionicons
          name="close-circle-outline"
          size={24}
          style={styles.closeIcon}
          onPress={onClose}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Título da pergunta</Text>
        <TextInput
          style={styles.input}
          value={pergunta.titulo}
          onChangeText={(text) => setPergunta({ ...pergunta, titulo: text })}
          placeholder="Digite o título"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={pergunta.description}
          onChangeText={(text) =>
            setPergunta({ ...pergunta, description: text })
          }
          placeholder="Digite a descrição"
          multiline
        />
      </View>

      {respostas.map((resposta, index) => (
        <View key={index} style={styles.respostaGroup}>
          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>{`Resposta ${index + 1}`}</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={resposta.description}
              onChangeText={(text) => handleRespostaChange(index, text)}
              placeholder={`Digite a resposta ${index + 1}`}
              multiline
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Resposta correta</Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                resposta.resultado ? styles.checkboxChecked : {},
              ]}
              onPress={() => handleRespostaCheckboxChange(index)}
            />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={onSubmit}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
  fullWidth: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: "bold",
    color: "white",
  },
  closeIcon: {
    color: "white",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    color: "white",
    backgroundColor: "#333",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  respostaGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#570DF8",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  saveButton: {
    backgroundColor: "#20DF7F",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
