import {View, Text, StyleSheet} from "react-native";
import { Avatar, Button, Paragraph, Card,  } from "react-native-paper";

// Icons
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

export type postData = {
    profile: {
        username: String,
        profileImage: undefined | null | String
    },
    content: String,
    link: undefined | null | String
}

export default function PostCard (data: postData) {
    return (
        <Card
        elevation={3}
        style={{ backgroundColor: "white" }}
        >
            <Card.Content>
                <View
                style={{
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                }}
                >
                    <Avatar.Text
                    size={40}
                    label={`${data.data.profile.username[0]}${data.data.profile.username[1]}`}
                    />
                    <View>
                        <Text style={{ fontWeight: "bold" }} >{data.data.profile.username}</Text>
                    </View>
                </View>
                <Paragraph style={{ color: "black" }}>{data.data.content}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button
                style={styles.btn}
                >
                    <FontAwesome6 name="heart" size={20} color="black" />
                </Button>
                <Button
                style={styles.btn}
                >
                    <Ionicons name="chatbox-outline" size={20} color="black" />
                </Button>
                <Button
                style={styles.btn}
                >
                    <AntDesign name="sharealt" size={20} color="black" />
                </Button>
                <Button
                style={styles.btn}
                >
                    <EvilIcons name="image" size={28} color="black" />
                </Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "transparent",
        borderColor: "transparent"
    }
});