import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const API_URL = "https://numbersapi.p.rapidapi.com";
const API_HOST = "numbersapi.p.rapidapi.com";
const API_KEY = "f0b52a5419msh8489993ef14f574p1e18fdjsn9b5956ff1a9c"; // Replace with your API Key

export default function FactFetcher({ month, day }: { month: number; day: number }) {
  const [fact, setFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFact = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_URL}/${month}/${day}/date?json=true&fragment=true`, {
          headers: {
            "X-RapidAPI-Host": API_HOST,
            "X-RapidAPI-Key": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFact(data.text);
      } catch (error) {
        setError(`Failed to fetch fact:`);
      } finally {
        setLoading(false);
      }
    };

    fetchFact();
  }, [month, day]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <Text style={styles.fact}>{fact}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  fact: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});