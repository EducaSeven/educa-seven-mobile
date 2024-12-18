import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function StudentName() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const errorText = "Erro ao salvar nome";

  const router = useRouter();

  const submitLogin = () => {
    router.navigate("home");
  };

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{errorText}</Text>
          <TouchableOpacity onPress={() => setError(false)}>
            <Text style={styles.toastClose}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.title}>Educa7</Text>
      <Text style={styles.subtitle}>Escolha um nome para ser seu!</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui seu nome"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TouchableOpacity style={styles.button} onPress={submitLogin}>
          <Text style={styles.buttonText}>Começar!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  toast: {
    backgroundColor: "#ffcccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  toastText: {
    color: "#ff0000",
  },
  toastClose: {
    color: "#007bff",
    marginTop: 5,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    fontFamily: "LexendDeca",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    width: "80%",
    backgroundColor: "#20DF7F",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
