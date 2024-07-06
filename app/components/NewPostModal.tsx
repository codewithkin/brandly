import { Modal, Portal, Text, Button, TextInput, ActivityIndicator } from 'react-native-paper';
import { View, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import Toast from 'react-native-root-toast';

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
        try {
            setLoading(true);
            const { error } = await supabase
            .from('posts')
            .insert({ profile: {username: session?.user.email, profileImage: session?.user.email }, content })
        
            if(error) {
                console.log(error);
                Alert.alert(error.message);
            }
            
            hideModal()

            // Add a Toast on screen.
            let toast = Toast.show('Post successfully created', {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: "#132A13"
            });

            // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
            setTimeout(function hideToast() {
                Toast.hide(toast);
            }, 2500);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
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
                        maxLength={200}
                        label="New Post"
                        value={content}
                        onChangeText={content => setContent(content)}
                        style={{ backgroundColor: "white", minHeight: 100 }}
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
                        style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
                    >
                        Post
                        {
                            loading &&
                            <ActivityIndicator
                            animating={loading}
                            color="white"
                            size={13}
                            />
                        }
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