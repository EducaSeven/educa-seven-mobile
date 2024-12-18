import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface CardQuizProps {
  title: string;
  id: string;
  description: string;
}

const CardQuiz: React.FC<CardQuizProps> = ({ title, id, description }) => {
  const router = useRouter();

  const visualizeQuiz = (id: any) => {
    router.navigate("create-quiz");
  };

  const copyLink = () => {};

  const playQuiz = () => {
    router.navigate("room-code");
  };

  return (
    <View style={styles.card}>
      <View style={styles.figure}>
        <Image
          style={styles.image}
          source={{ uri: "https://picsum.photos/100/100" }}
          accessibilityLabel={title}
        />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{id}</Text>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.buttonPlay}
            onPress={() => playQuiz()}
          >
            <Ionicons name="play" size={12} style={styles.buttonText} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => visualizeQuiz(id)}
          >
            <Text style={styles.buttonText}>Visualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={copyLink}>
            <Text style={styles.buttonText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 16,
  },
  figure: {
    height: 150,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardBody: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  badge: {
    backgroundColor: "#4caf50",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonPlay: {
    backgroundColor: "#20DF7F",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
});

export default CardQuiz;
