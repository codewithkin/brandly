import { View, StyleSheet } from "react-native";
import { Text, Avatar, Card } from "react-native-paper";
import { postData } from "./Post";
import { User } from "@supabase/supabase-js";

type listData = {
    data: {
        content: string,
        user: {
            email: string,
        },
    }
}

export default function Comment (listData: listData) {
    const data = listData.data;
    console.log(listData)
    return (
        <Card
            style={{ width: "75%", alignSelf: "flex-end" }}
        >
            <Card.Content>
                <View style={{flexDirection: "row", gap: 4 }}>
                    <Avatar.Text
                        size={30}
                        label={`${data.user.email[0]}${data.user.email[1]}`}
                    />
                    <Text style={{ fontSize: 15 }}>{data.user.email}</Text>
                </View>

                <Text style={{ fontSize: 16 }}>{data.content}</Text>
            </Card.Content>
        </Card>
    )
}