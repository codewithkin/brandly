import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Avatar, Button, Paragraph, Card } from "react-native-paper";
import { FontAwesome6, Ionicons, AntDesign, EvilIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import usePostDetailsStore from "../stores/postDetailsStore";

export type postData = {
    profile: {
        username: string, // Changed String to string
        profileImage: undefined | null | string // Changed String to string
    },
    content: string, // Changed String to string
    link: undefined | null | string // Changed String to string
}

export default function PostDetails () {
    const {profile, id, content} = usePostDetailsStore(state => state);
    console.log(profile, id, content);
    const router = useRouter();

    const toHomeScreen = () => {
        router.replace("(tabs)");
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Post Details",
                    headerLeft: () => <Button onPress={toHomeScreen} icon="arrow-left">-</Button>
                }}
            />
            <Card elevation={3} style={{ backgroundColor: "white" }}>
                <Card.Content>
                    <View style={[styles.flexLg, { gap: 3 }]}>
                        {profile?.username ? (
                            <Avatar.Text
                                size={40}
                                label={`${profile.username[0]}${profile.username[1]}`}
                            />
                        ) : (
                            <Avatar.Text
                                size={40}
                                label="?"
                            />
                        )}
                        <View>
                            <Text style={{ fontWeight: "bold" }}>{profile?.username || "Anonymous User"}</Text>
                        </View>
                    </View>
                    <Paragraph style={{ color: "black" }}>{content || "No content"}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <View style={styles.btwn}>
                        <View style={[styles.flexLg]}>
                            <Button style={[styles.btn, styles.flex]}>
                                <FontAwesome6 name="heart" size={15} color="black" />
                                <Text style={styles.stats}>10</Text>
                            </Button>
                            <Button style={[styles.btn, styles.flex]}>
                                <Ionicons name="chatbox-outline" size={15} color="black" />
                                <Text style={styles.stats}>10</Text>
                            </Button>
                            <Button style={[styles.btn, styles.flex]}>
                                <AntDesign name="sharealt" size={15} color="black" />
                                <Text style={styles.stats}>10</Text>
                            </Button>
                        </View>
                        <View style={[styles.btn, styles.flex]}>
                            <Button style={[styles.btn, styles.flex]}>
                                <EvilIcons name="image" size={18} color="black" />
                                <Text style={styles.stats}>10</Text>
                            </Button>
                        </View>
                    </View>
                </Card.Actions>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        padding: 10,
    },
    btn: {
        backgroundColor: "transparent",
        borderColor: "transparent"
    },
    flexLg: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    flex: {
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
    },
    btwn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    stats: {
        fontSize: 12,
        fontWeight: "300",
        color: "black"
    },
});
