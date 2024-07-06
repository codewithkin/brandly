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
                style={[styles.flexLg, {gap: 3}]}
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
                <View style={styles.btwn}>
                    <View style={[ styles.flexLg ]}>
                        <Button
                        style={[ styles.btn, styles.flex ]}
                        >
                            <FontAwesome6 name="heart" size={15} color="black" />
                            <Text style={styles.stats}>10</Text>
                        </Button>
                        <Button
                        style={[ styles.btn, styles.flex ]}
                        >
                            <Ionicons name="chatbox-outline" size={15} color="black" />
                            <Text style={styles.stats}>10</Text>
                        </Button>
                        <Button
                        style={[ styles.btn, styles.flex ]}
                        >
                            <AntDesign name="sharealt" size={15} color="black" />
                            <Text style={styles.stats}>10</Text>
                        </Button>
                    </View>

                    <View style={[ styles.btn, styles.flex ]}>
                        <Button
                            style={[ styles.btn, styles.flex ]}
                        >
                            <EvilIcons name="image" size={28} color="black" />
                            <Text style={styles.stats}>10</Text>
                        </Button>
                    </View>
                </View>
                
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
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
        fontWeight: "500",
        color: "black"
    },
});