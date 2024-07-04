import { Text, View, SafeAreaView, StyleSheet } from "react-native";

export default function ChatPage () {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>AI Page</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
    }
})