import { User } from "@supabase/supabase-js";
import { View, StyleSheet } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { postData } from "./Post";

export type listData = {
    data: {
        data: postData
    }
}

export default function Comment (listData: listData) {
    const data = listData.data;
    return (
        <View>
            <View>
                <Avatar.Text
                    size={40}
                    label={`${data.user.email[0]}${data.user.email[1]}`}
                />
                <Text>{data.user.email}</Text>
            </View>

            <Text>{data.content}</Text>
        </View>
    )
}