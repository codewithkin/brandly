import { StyleSheet, View, Text } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
        <View
          style={styles.topBar}
        >
          <Text
          style={styles.brand}
          >BRANDLY</Text>

          <View style={styles.icons}>
            <Fontisto name="bell" size={24} color="black" />
            <Ionicons name="search" size={24} color="black" />
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginTop: 5,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  brand: {
    fontSize: 18,
    fontWeight: "900",
  },
  icons: {
    flexDirection: "row",
    gap: 5,
  }
});
