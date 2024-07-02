import { StyleSheet, View, Text } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import CircularProgress from 'react-native-circular-progress-indicator';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['lightblue', 'transparent']}
        style={styles.gradient}
      />
        <View
          style={styles.topBar}
        >
          <View
          style={styles.brandContainer}
          >
            <FontAwesome6 
              name="fire" 
              size={24} 
              color="red" 
            />  
            <Text
            style={styles.brand}
            >
              BRANDLY
            </Text>
          </View>

          <View style={styles.icons}>
            <Fontisto name="bell" size={24} color="black" />
            <Ionicons name="search" size={24} color="black" />
          </View>
      </View>

      <View
      style={styles.statsCards}
      >
        <View 
          style={styles.card}
        >
          <Text>New users</Text>
          <CircularProgress
            value={20}
            radius={120}
            duration={1000}
            progressValueColor={'lightblue'}
            maxValue={200}
            title={'%'}
            titleColor={'lightblue'}
            titleStyle={{fontWeight: 'semibold'}}
          />
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
    padding: 10,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  brand: {
    fontSize: 18,
    fontWeight: "900",
  },
  brandContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    flexDirection: "row",
    gap: 8,
  },
  statsCards: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    padding: 10,
    borderRadius: 15,
    shadowColor: "black",
    width: 200,
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: {
      width: -2,
      height: 4,
    },
  },
});
