import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getText } from "../firebase/notes";

export default function NotesProfile() {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [notes, setNotes] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const result = await getText(uid);
      setNotes(result);
    };
    fetchNotes();
  }, []);

  return (
    <>
      <Text style={styles.sectionTitle}>📝 Notas</Text>
      <View style={styles.card}>
        {notes.map((item) => (
          <Text key={item.id} style={styles.cardText}>
            {item.text}
          </Text>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#d6336c",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
});
