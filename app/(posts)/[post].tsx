import { View, StyleSheet, Text, Alert, FlatList } from "react-native";
import { Avatar, Button, Paragraph, Card, TextInput, ActivityIndicator } from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import usePostDetailsStore from "../stores/postDetailsStore";
import likePost, { checkLiked } from "../utils/Posts/likePost";
import sharePost from "../utils/Posts/sharePost";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Comment from "../components/Comment";
import newComment from "../utils/Posts/newComment";

export type postData = {
    profile: {
        username: String,
        profileImage: undefined | null | String,
    },
    content: String,
    id: number
}

export default function PostCard () {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [post, setPost] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const { content, profile, likes, comments, bookmarks, shares, id } = usePostDetailsStore(state => state);
    const router = useRouter();

    const toHomeScreen = () => {
        router.replace("(tabs)");
    }
    // Update functions
    const update = usePostDetailsStore(state => state.update);

    const getPostDetails = (post: postData) => {
        // Update the zustand store
        update(post);

        // Redirect to the details page
        router.push({ pathname: `(posts)/${id}`});
    };

    const refresh = async () => {
        try {
            setIsFetching(true)
            // Get from supabase
            const { data, error } = await supabase
            .from('posts')
            .select()
            .eq("id", id)

            if(error) {
                Alert.alert(error.message);
            }
        
            // Update the state
            setPost(data[0]);
            console.log(data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        refresh()
        const checkIfLiked = async () => {
            const isPostLiked = await checkLiked(id);

            if(isPostLiked) {
                setLiked(true)
            }
        }

        checkIfLiked();
    }, [])

    const saveNewComment = () => {
        newComment(id, comment).then(() => console.log("Comment saved")).catch(e => console.log(e));
    }

    return (
        <View style={styles.container}>
            <Card elevation={3} style={{ backgroundColor: "white" }}>
                <Stack.Screen
                    options={{
                        title: "Post Details",
                        headerLeft: () => <Button onPress={toHomeScreen} icon="arrow-left">-</Button>
                    }}
                />

                <Card.Content>
                        <View style={[styles.flexLg, { gap: 3 }]}>
                            <Avatar.Text
                                size={40}
                                label={`${profile.username[0]}${profile.username[1]}`}
                            />
                            <View>
                                <Text style={{ fontWeight: "bold" }}>{profile.username}</Text>
                            </View>
                        </View>
                        <Paragraph style={{ color: "black" }}>{content}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <View style={styles.btwn}>
                        <View style={[styles.flexLg]}>
                            <Button 
                            icon={liked ? "cards-heart" : "cards-heart-outline"}
                            textColor={liked && "red"}
                            onPress={() => likePost(id)}
                            style={[styles.btn, styles.flex]}>
                                <Text>{likes.length}</Text>
                            </Button>
                            <Button 
                            icon="chat"
                            style={[styles.btn, styles.flex]}>
                                <Text>{comments.length}</Text>
                            </Button>
                            <Button 
                            icon="share-variant-outline"
                            onPress={() => sharePost(id)}
                            style={[styles.btn, styles.flex]}>
                                <Text>{shares.length}</Text>
                            </Button>
                        </View>
                        <View style={[styles.btn, styles.flex]}>
                            <Button 
                            icon="image"
                            style={[styles.btn, styles.flex]}>
                                <Text>{bookmarks.length}</Text>
                            </Button>
                        </View>
                    </View>
                </Card.Actions>
            </Card>
            <View style={{ gap: 3 }}>
                    <TextInput
                        mode="outlined"
                        disabled={loading}
                        multiline={true}
                        textColor="#9c89b8"
                        maxLength={200}
                        label="New Comment"
                        value={comment}
                        onChangeText={content => setComment(content)}
                    />
                <Button
                    buttonColor="purple"
                    textColor="white"
                    style={{width: 90}}
                    disabled={loading}
                    onPress={saveNewComment}
                >
                    <ActivityIndicator
                        animating={loading}
                        color="white"
                        size={13}
                    />
                    Save
                </Button>
            </View>

            <View style={{ paddingTop: 20 }}>
                {
                    comments.length > 0 ?
                    <FlatList
                        data={comments}
                        onRefresh={refresh}
                        refreshing={isFetching}
                        renderItem={({item}) => <Comment data={item}/>}
                        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
                        style={{ padding: 10 }}
                    /> :
                    <Text style={styles.heading}>No Comments Yet</Text>
                }  
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        gap: 10,
        padding: 10
    },
    heading: {
        fontSize: 20,
        color: "gray",
        textAlign: "center",
    },
    btn: {
        
    },
    seperator: {
        height: 10,
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
