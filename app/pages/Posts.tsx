import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import PostCard, { postData } from "../components/Post";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "../lib/supabase";

export default function Posts () {
    const [posts, setPosts] = useState<Array<postData>>([]);
    const [isFetching, setIsFetching] = useState(false);

    // Get the latest posts
    const fetchData = async () => {
        try {
            setIsFetching(true)
            // Get from supabase
            const { data, error } = await supabase
            .from('posts')
            .select()

            if(error) {
                Alert.alert(error.message);
            }
        
            // Update the state
            setPosts(data);
            console.log("Posts: ", data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View
        style={styles.container}
        >
            <Text
            style={styles.title}
            >Latest Posts</Text>

        <Suspense fallback={<Text>Loading</Text>}>
            {
                posts.length > 0 ?
                <FlatList
                    data={posts}
                    onRefresh={fetchData}
                    refreshing={isFetching}
                    renderItem={({item}) => <PostCard data={item}/>}
                    ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
                    style={{ padding: 10 }}
                /> :
                <Text style={styles.noposts}>No posts Just yet</Text>
            }  
        </Suspense>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    noposts: {
        fontSize: 22,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        paddingVertical: 4,
    },
    seperator: {
        height: 10,
    },
});