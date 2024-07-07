import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import PostCard from "../components/Post";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "../lib/supabase";

export default function Posts () {
    const [posts, setPosts] = useState<any[]|null>([]);
    const [isFetching, setIsFetching] = useState(false);
    const refresh = async () => {
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
            console.log(data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        refresh()
    }, [])

    return (
        <View
        style={styles.container}
        >
            <Text
            style={styles.title}
            >Latest Posts</Text>

        <Suspense fallback={<Text>Loading</Text>}>
            <FlatList
                data={posts}
                onRefresh={refresh}
                refreshing={isFetching}
                renderItem={({item}) => <PostCard data={item}/>}
                ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
                style={{ padding: 10 }}
            />
        </Suspense>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

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