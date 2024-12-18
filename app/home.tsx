import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CardQuiz from "../components/card-quiz";
import Header from "../components/header";
import { useRouter } from "expo-router";

export default function Home() {
  const [quizzes, setQuizzes] = useState<any[]>([
    {
      id: "1",
      title: "Quiz 1",
      description: "Quiz 1 description",
    },
    {
      id: "2",
      title: "Quiz 2",
      description: "Quiz 2 description",
    },
    {
      id: "3",
      title: "Quiz 3",
      description: "Quiz 3 description",
    },
    {
      id: "4",
      title: "Quiz 4",
      description: "Quiz 4 description",
    },
    {
      id: "5",
      title: "Quiz 5",
      description: "Quiz 5 description",
    },
  ]);

  const router = useRouter();

  const criarQuiz = () => {
    router.navigate("create-quiz");
  };

  const criarPergunta = () => {
    router.navigate("create-question");
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>Quizzes</Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.button} onPress={criarQuiz}>
            <Text style={styles.buttonText}>Criar Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={criarPergunta}>
            <Text style={styles.buttonText}>Criar Pergunta</Text>
          </TouchableOpacity>
        </View>
      </View>
      {quizzes.map((quiz) => (
        <CardQuiz
          key={quiz.id}
          id={quiz.id}
          title={quiz.title}
          description={quiz.description}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    overflow: "hidden",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    padding: 20,
  },
  button: {
    width: 120,
    height: 35,
    backgroundColor: "#20DF7F",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  containerButtons: {
    flexDirection: "row",
    gap: 10,
    width: 275,
  },
});
