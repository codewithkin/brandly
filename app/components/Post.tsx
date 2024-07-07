import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, Paragraph, Card } from "react-native-paper";
import { FontAwesome6, Ionicons, AntDesign, EvilIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import usePostDetailsStore from "../stores/postDetailsStore";

export type postData = {
    profile: {
        username: String,
        profileImage: undefined | null | String,
    },
    content: String,
    id: number
}

export default function PostCard(data: postData) {
    const post = data.data;
    // Update functions
    const update = usePostDetailsStore(state => state.update);

    const router = useRouter();
    const getPostDetails = (post: postData) => {
        // Update the zustand store
        update(post);

        // Redirect to the details page
        router.push({ pathname: `(posts)/${post.id}`});
    };

    return (
        <Card elevation={3} style={{ backgroundColor: "white" }}>
            <Card.Content>
                    <View style={[styles.flexLg, { gap: 3 }]}>
                        <Avatar.Text
                            size={40}
                            label={`${post.profile.username[0]}${post.profile.username[1]}`}
                        />
                        <View>
                            <Text style={{ fontWeight: "bold" }}>{post.profile.username}</Text>
                        </View>
                    </View>
                    <Paragraph style={{ color: "black" }}>{post.content}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <View style={styles.btwn}>
                    <View style={[styles.flexLg]}>
                        <Button style={[styles.btn, styles.flex]}>
                            <FontAwesome6 name="heart" size={15} color="black" />
                            <Text style={styles.stats}>{post.likes.length}</Text>
                        </Button>
                        <Button onPress={() => getPostDetails(post)} style={[styles.btn, styles.flex]}>
                            <Ionicons name="chatbox-outline" size={15} color="black" />
                            <Text style={styles.stats}>{post.comments.length}</Text>
                        </Button>
                        <Button style={[styles.btn, styles.flex]}>
                            <AntDesign name="sharealt" size={15} color="black" />
                            <Text style={styles.stats}>{post.shares.length}</Text>
                        </Button>
                    </View>
                    <View style={[styles.btn, styles.flex]}>
                        <Button style={[styles.btn, styles.flex]}>
                            <EvilIcons name="image" size={18} color="black" />
                            <Text style={styles.stats}>{post.bookmarks.length}</Text>
                        </Button>
                    </View>
                </View>
            </Card.Actions>
        </Card>
    );
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
        fontWeight: "300",
        color: "black"
    },
});
