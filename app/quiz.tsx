import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Header from "../components/header";
import { useRouter } from "expo-router";

interface Pergunta {
  id: string;
  titulo: string;
  description: string;
  respostas: Resposta[];
}

interface Resposta {
  description: string;
  resultado: boolean;
  id: string;
}

export default function Quiz() {
  const [perguntas, setPerguntas] = useState<any[]>([
    {
      id: "1",
      titulo: "Qual é a cor do céu?",
      description: "A cor do céu é azul.",
      respostas: [
        { description: "Azul", resultado: true, id: "1" },
        { description: "Verde", resultado: false, id: "2" },
        { description: "Vermelho", resultado: false, id: "3" },
        { description: "Amarelo", resultado: false, id: "4" },
      ],
    },
    {
      id: "2",
      titulo: "Qual é a cor do sol?",
      description: "A cor do sol é amarelo.",
      respostas: [
        { description: "Azul", resultado: false, id: "1" },
        { description: "Verde", resultado: false, id: "2" },
        { description: "Vermelho", resultado: false, id: "3" },
        { description: "Amarelo", resultado: true, id: "4" },
      ],
    },
    {
      id: "3",
      titulo: "Qual é a cor da grama?",
      description: "A cor da grama é verde.",
      respostas: [
        { description: "Azul", resultado: false, id: "1" },
        { description: "Verde", resultado: true, id: "2" },
        { description: "Vermelho", resultado: false, id: "3" },
        { description: "Amarelo", resultado: false, id: "4" },
      ],
    },
    {
      id: "4",
      titulo: "Qual é a cor do fogo?",
      description: "A cor do fogo é vermelho.",
      respostas: [
        { description: "Azul", resultado: false, id: "1" },
        { description: "Verde", resultado: false, id: "2" },
        { description: "Vermelho", resultado: true, id: "3" },
        { description: "Amarelo", resultado: false, id: "4" },
      ],
    },
  ]);

  const [cont, setCont] = useState(0);
  const [buttonColors, setButtonColors] = useState<string[]>(Array(4).fill(""));
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(60); // 60 segundos para cada pergunta
  const [barraProgressoCor, setBarraProgressoCor] = useState("green"); // cor inicial da barra
  const [progressWidth] = useState(new Animated.Value(100)); // animação de largura da barra
  const router = useRouter();

  useEffect(() => {
    if (quizFinalizado) return;

    const intervalo = setInterval(() => {
      setTempoRestante((prevTempo) => {
        if (prevTempo <= 0) {
          clearInterval(intervalo);
          // Você pode querer finalizar o quiz ou passar para a próxima pergunta
          return 0;
        }
        return prevTempo - 1;
      });
    }, 1000); // atualiza a cada 1 segundo

    return () => clearInterval(intervalo); // limpa o intervalo quando o componente for desmontado ou quiz finalizado
  }, [tempoRestante, quizFinalizado]);

  useEffect(() => {
    // Atualiza a cor da barra de progresso conforme o tempo restante
    if (tempoRestante > 40) {
      setBarraProgressoCor("green");
    } else if (tempoRestante > 20) {
      setBarraProgressoCor("yellow");
    } else {
      setBarraProgressoCor("red");
    }

    // Animar a largura da barra de progresso
    Animated.timing(progressWidth, {
      toValue: (tempoRestante / 60) * 100,
      duration: 1000, // Durar a animação de 1 segundo
      useNativeDriver: false, // Não usar native driver para propriedades não suportadas
    }).start();
  }, [tempoRestante]);

  async function responder(resultado: boolean, index: number) {
    if (quizFinalizado) return;

    const newButtonColors = [...buttonColors];
    newButtonColors[index] = resultado ? "green" : "red";
    setButtonColors(newButtonColors);

    setTimeout(() => {
      if (cont === perguntas.length - 1) {
        setQuizFinalizado(true);
        setButtonColors(Array(4).fill(""));
        alert("Fim do quiz!");
        setTimeout(() => {
          router.navigate("dashboard");
        }, 3000);
        return;
      }
      setCont(cont + 1);
      setButtonColors(Array(4).fill(""));
      setTempoRestante(60); // Reseta o tempo ao responder
    }, 500);
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>{perguntas[cont].titulo}</Text>
      </View>
      <Text style={styles.description}>{perguntas[cont].description}</Text>

      <View style={styles.footer}>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
                backgroundColor: barraProgressoCor,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.answersContainer}>
        {perguntas[cont].respostas.map((resposta: any, index: number) => (
          <TouchableOpacity
            key={resposta.id}
            style={[
              styles.answerButton,
              { backgroundColor: buttonColors[index] },
            ]}
            onPress={() => responder(resposta.resultado, index)}
            disabled={quizFinalizado}
          >
            <Text style={styles.answerText}>{resposta.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    overflow: "hidden",
  },
  header: {
    marginBottom: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  progressBarContainer: {
    width: "100%",
    height: 15,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBar: {
    height: 15,
    borderRadius: 5,
  },
  answersContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  answerButton: {
    width: "100%",
    height: 100,
    padding: 20,
    borderColor: "#570DF8",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  answerText: {
    color: "white",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
