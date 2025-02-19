import { View, StyleSheet, Text } from "react-native";
import { Avatar, Button, Paragraph, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import usePostDetailsStore from "../stores/postDetailsStore";
import likePost, { checkLiked } from "../utils/Posts/likePost";
import sharePost from "../utils/Posts/sharePost";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export type postData = {
    profile: {
        username: String,
        profileImage: string,
    },
    shares: Array<User>,
    updated_at: string,
    content: String,
    id: number,
    likes: Array<User>,
    bookmarks: Array<User>,
    comments: Array<{ content: string, user: Array<User> }>,
    created_at: string,
    images: Array<string>,
}

type listData = {
    data: postData
}

export default function PostCard(listData: listData) {
    const [liked, setLiked] = useState(false);

    // Get the post data
    const post = listData.data;

    // Update functions
    const update = usePostDetailsStore(state => state.update);
    const txtColor: string = liked ? "red" : "black";

    // For redirects
    const router = useRouter();

    // Get the post's metadata
    const getPostDetails = (post: postData) => {
        // Update the zustand store
        update(post);

        // Redirect to the details page
        router.push({ pathname: `(posts)/${post.id}`});
    };

    useEffect(() => {
        // Check if the current post is liked
        const checkIfLiked = async () => {
            const isPostLiked = await checkLiked(post.id);

            // If the post is liked...
            if(isPostLiked) {
                //.....update tbe liked variable
                // ....display the red heart icon
                setLiked(true)
            }
        }

        // Call the function
        checkIfLiked();
    })

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
                        <Button 
                        icon={liked ? "cards-heart" : "cards-heart-outline"}
                        textColor={txtColor}
                        onPress={() => likePost(post.id)}
                        style={[styles.btn, styles.flex]}>
                            <Text>{post.likes.length}</Text>
                        </Button>
                        <Button 
                        icon="chat"
                        onPress={() => getPostDetails(post)} style={[styles.btn, styles.flex]}>
                            <Text>{post.comments.length}</Text>
                        </Button>
                        <Button 
                        icon="share-variant-outline"
                        onPress={() => sharePost(post.id)}
                        style={[styles.btn, styles.flex]}>
                            <Text>{post.shares.length}</Text>
                        </Button>
                    </View>
                    <View style={[styles.btn, styles.flex]}>
                        <Button 
                        icon="image"
                        style={[styles.btn, styles.flex]}>
                            <Text>{post.bookmarks.length}</Text>
                        </Button>
                    </View>
                </View>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    btn: {
        
    },
    flexLg: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    flex: {
        flexDirection: "row",
        gap: 50,
        alignItems: "center",
    },
    btwn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    stats: {
        fontSize: 14,
        fontWeight: "400",
        color: "black"
    },
});
