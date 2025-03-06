import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import FactFetcher from "../components/FactFetcher";
import months from "../constants/months";

export default function ApiPage() {
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleDayChange = (value: string) => {
    const dayNumber = parseInt(value);
    const monthNumber = month ? month : 0;
    if(monthNumber == 2){
      if (dayNumber >= 1 && dayNumber <= 29) {
        setDay(value);
        setMessage("");
      } else {
        setDay("");
        setMessage("Day must be between 1 and 29");
      }
    } else if (dayNumber >= 1 && dayNumber <= 31) {
      setDay(value);
      setMessage("");
    } else {
      setDay("");
      setMessage("Day must be between 1 and 31");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Month & Day</Text>

      {/* Month Dropdown */}
      <RNPickerSelect
        onValueChange={(value) => setMonth(value)}
        items={months}
        style={pickerStyles}
        placeholder={{ label: "Select a month...", value: null }}
      />

      {/* Day Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Day (1-31)"
        keyboardType="numeric"
        maxLength={2}
        value={day}
        onChangeText={(value) => handleDayChange(value)}
      />
      {message ? <Text style={styles.error}>{message}</Text> : null}
      {/* API Call Component */}
      {month && day && <FactFetcher month={month} day={parseInt(day, 10)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  }
});

const pickerStyles = {
  inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1, borderRadius: 8, marginBottom: 10, backgroundColor: "#fff" },
  inputAndroid: { fontSize: 16, padding: 10, borderWidth: 1, borderRadius: 8, marginBottom: 10, backgroundColor: "#fff" },
};