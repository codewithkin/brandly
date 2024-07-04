import { Text, View, SafeAreaView, StyleSheet } from "react-native";

export default function ChatPage () {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>Videos Page</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
    }
})