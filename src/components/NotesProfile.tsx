import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getText } from "../firebase/notes";
import { colors } from "../theme/theme";

export default function NotesProfile() {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [notes, setNotes] = useState<{ id: string; text: string }[]>([]);
  const [avatar, setAvatar] = useState<string | null>(null); // por si tenés la imagen de perfil

  useEffect(() => {
    const fetchNotes = async () => {
      const result = await getText(uid);
      setNotes(result);
    };
    fetchNotes();
  }, []);

  return (
    <>
      {notes.map((item) => (
        <View key={item.id} style={styles.noteCard}>
          <Image
            source={
              avatar
                ? { uri: avatar }
                : require("../../assets/images/avatar-placeholder.jpg")
            }
            style={styles.avatar}
          />
          <View style={styles.noteContent}>
            <View style={styles.noteHeader}>
              <Text style={styles.name}>Ramiro oyham</Text>
              <Text style={styles.time}>2h</Text>
            </View>
            <Text style={styles.noteText}>{item.text}</Text>
            <Text style={styles.heart}>🤍</Text>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginBottom: 10,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: colors.primary,
  },
  noteCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  noteContent: {
    flex: 1,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontFamily: "Poppins_600SemiBold",
    color: colors.text,
    fontSize: 14,
  },
  time: {
    color: colors.muted,
    fontSize: 12,
  },
  noteText: {
    fontFamily: "Poppins_400Regular",
    color: colors.text,
    fontSize: 14,
    marginTop: 2,
  },
  heart: {
    marginTop: 10,
    fontSize: 16,
    color: colors.muted,
  },
});
