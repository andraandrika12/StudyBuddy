import React from "react";
// import * as TalkRn from '@talkjs/react-native';
import { View, StyleSheet } from "react-native";
import * as TalkRn from "@talkjs/expo";
import CustomHeader from "../components/CustomHeader";

export default function ChatScreen({ route }) {
  const { data } = route.params;
  const me = {
    id: data.me._id,
    name: data.me.username,
    email: data.me.email,
    photoUrl: "https://uhs-group.com/wp-content/uploads/2020/08/person-dummy-e1553259379744.jpg",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const other = {
    id: data.other._id,
    name: data.other.username,
    email: data.other.email,
    photoUrl: "https://uhs-group.com/wp-content/uploads/2020/08/person-dummy-e1553259379744.jpg",
    welcomeMessage: "Hey, how can I help?",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  return (
    <>
      <CustomHeader title='Chat With Buddy' />
      <View style={styles.container}>
        <TalkRn.Session appId='t8orPdLy' me={me}>
          <View style={styles.chatboxContainer}>
            <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
          </View>
        </TalkRn.Session>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  chatboxContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
