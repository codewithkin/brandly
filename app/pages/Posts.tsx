import { View, Text, StyleSheet, FlatList } from "react-native";
import PostCard from "../components/Post";

export default function Posts () {
    const posts = [
        {
        profile: {
            username: "kinzinzombe07",
            profileImage: "Howdie!",
        },
        content: "Hey there y'all, Kin Here. Hope you're having a great time here on here Brandly! Follow me and let's connect",
        id: 4
    },
    {
        profile: {
            username: "kinzinzombe07",
            profileImage: "Howdie!",
        },
        content: "Hey there y'all, Kin Here. Hope you're having a great time here on here Brandly! Follow me and let's connect",
        id: 2
    },
    {
        profile: {
            username: "kinzinzombe07",
            profileImage: "Howdie!",
        },
        content: "Hey there y'all, Kin Here. Hope you're having a great time here on here Brandly! Follow me and let's connect",
        id: 3
    },
    {
        profile: {
            username: "kinzinzombe07",
            profileImage: "Howdie!",
        },
        content: "Hey there y'all, Kin Here. Hope you're having a great time here on here Brandly! Follow me and let's connect",
        id: 7
    }
    ]

    return (
        <View
        style={styles.container}
        >
            <Text
            style={styles.title}
            >Latest Posts</Text>

            <FlatList
                data={posts}
                renderItem={({item}) => <PostCard data={item}/>}
                ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
                style={{ padding: 10 }}
            />
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