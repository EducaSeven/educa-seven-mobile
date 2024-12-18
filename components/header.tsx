import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();

  const redirectForHome = () => {
    router.navigate("home");
  };

  return (
    <View>
      <Text style={styles.title} onPress={redirectForHome}>
        Educa7
      </Text>
      <Ionicons name="menu-outline" size={24} style={styles.menu} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#444",
    backgroundColor: "black",
    color: "white",
  },
  menu: {
    position: "absolute",
    right: 20,
    top: 30,
    color: "white",
  },
});
