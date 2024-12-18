import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CheckBox } from "react-native-btr";

export default function Login() {
  const [useremail, setUsermail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const errorText = "Erro ao fazer login";

  const [isSelected, setSelection] = useState(false);
  const router = useRouter();

  const submitLogin = () => {
    router.navigate("student-name");
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
      <Text style={styles.subtitle}>
        Faça seu login e comece a planejar suas aulas!
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={useremail}
          placeholderTextColor="#aaa"
          onChangeText={(text) => setUsermail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.containerRegister}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              color="#20DF7F"
              checked={isSelected}
              onPress={() => setSelection(!isSelected)}
            />
            <Text style={styles.label}>Lembrar de mim?</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.link}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={submitLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
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
  containerRegister: {
    justifyContent: "space-between",
    display: "flex",
    width: "80%",
    alignItems: "center",
    flexDirection: "row",
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
    color: "white",
    borderRadius: 5,
    marginBottom: 10,
  },
  link: {
    color: "white",
    textDecorationLine: "none",
    marginBottom: 20,
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    color: "white",
  },
  checkbox: {
    alignSelf: "center",
    color: "black",
  },
  label: {
    color: "white",
    margin: 8,
  },
});
