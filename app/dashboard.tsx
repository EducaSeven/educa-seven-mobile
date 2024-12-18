import { View, Text, StyleSheet } from "react-native";
import Header from "../components/header";
import React from "react";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.scoreContainer}>
        <Text style={styles.congratulationsText}>Parabéns, Jorge!</Text>
        <View style={styles.scoreDetails}>
          <Text style={styles.scoreLabel}>Sua pontuação: </Text>
          <Text style={styles.score}>1284</Text>
        </View>
      </View>

      <View style={styles.pillarsContainer}>
        <View style={[styles.pillar, styles.silver]}>
          <Text style={styles.pillarTitle}>Creiso</Text>
          <Text style={styles.pillarText}>1679</Text>
        </View>
        <View style={[styles.pillar, styles.gold]}>
          <Text style={styles.pillarTitle}>Xaolin matador de porco</Text>
          <Text style={styles.pillarText}>1780</Text>
        </View>
        <View style={[styles.pillar, styles.bronze]}>
          <Text style={styles.pillarTitle}>Jõao do pneu</Text>
          <Text style={styles.pillarText}>1544</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  scoreContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  scoreDetails: {
    flexDirection: "row",
    marginTop: 10,
  },
  scoreLabel: {
    fontSize: 18,
    color: "white",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  pillarsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "79%",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  pillar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  gold: {
    backgroundColor: "#FFD700",
    height: "100%",
  },
  silver: {
    backgroundColor: "#C0C0C0",
    height: "80%",
  },
  bronze: {
    backgroundColor: "#CD7F32",
    height: "60%",
  },
  pillarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  pillarText: {
    fontSize: 16,
    color: "#fff",
  },
});
