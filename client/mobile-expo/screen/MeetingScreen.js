import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "User", content: "Hello!" },
    { id: 2, sender: "Bot", content: "Hi there!" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "User", content: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text
              style={
                item.sender === "User" ? styles.userMessage : styles.botMessage
              }
            >
              {item.content}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#F0F0F0",
  },
  messageContainer: {
    marginBottom: 10,
  },
  userMessage: {
    padding: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignSelf: "flex-end",
    color: "white",
  },
  botMessage: {
    padding: 8,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    alignSelf: "flex-start",
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "white",
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  sendButton: {
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: "#2196F3",
    fontWeight: "bold",
  },
});
