import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import { View, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

type postModalProps = {
    visible: boolean,
    hideModal:  () => void
}

export default function NewPostModal ({ visible, hideModal }: postModalProps) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10};

    const [session, setSession] = useState<Session | null>(null)

      useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
          console.log(session);
        })

        console.log(session);
      }, [])

    async function createNewPost() {
        const { error } = await supabase
        .from('posts')
        .insert({ profile: {username: session?.user.email, profileImage: session?.user.email }, content })
    
        if(error) {
            console.log(error);
            Alert.alert(error.message);
        }
    
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text
                style={{ color: "black", fontSize: 20, }}
                >Create a new Post</Text>
                <View style={{ paddingVertical: 10 }}>
                    <TextInput
                        mode="outlined"
                        disabled={loading}
                        multiline={true}
                        textColor="#9c89b8"
                        label="New Post"
                        value={content}
                        onChangeText={content => setContent(content)}
                        style={{ backgroundColor: "white" }}
                    />
                </View>

                <View
                style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 5 }}
                >
                    <Button
                        mode="outlined"
                        onPress={hideModal}
                        textColor='darkgray'
                    >
                        Close
                    </Button>
                    <Button
                        mode="contained"
                        buttonColor="red"
                        textColor='white'
                        onPress={() => createNewPost() }
                    >
                        Post
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    actionButtons: {
        flexDirection: "row",
        gap: 4,
    },
})