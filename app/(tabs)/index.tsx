import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { FAB } from "react-native-paper";
import NewPostModal from "../components/NewPostModal";
import Posts from "../pages/Posts";

export default function TabOneScreen() {
  const [fill, setFill] = useState(0);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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

      {/*
      <FlatList
      horizontal={true}>
        <View 
          style={styles.card}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 17,
            }}
          >New users</Text>
          <View
          style={styles.progressBar}>
            <AnimatedCircularProgress
            size={50}
            width={5}
            fill={fill}
            tintColor="#00e0ff"
            backgroundColor="lightgray">
            {
              (fill) => (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "semibold",
                    fontSize: 20,
                  }}
                >
                  { fill }
                </Text>
              )
            }
          </AnimatedCircularProgress>
          </View>
        </View>
          <LinearGradient
          colors={['#184e77', '#1e6091', '#1a759f']}
          style={[styles.card, {
            width: '100%'
          }]}>
            <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 17,
            }}
            >Hello, World!</Text>
        </LinearGradient>
        <View 
          style={[styles.card, {
            width: '100%',
          }]}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 17,
            }}
          >New users</Text>
          </View>
      </FlatList>
      */}

      <Posts />
      <NewPostModal 
      hideModal={hideModal} 
      visible={visible} 
      />


      <FAB
        icon="plus"
        label="New Post"
        style={styles.fab}
        onPress={showModal}
      />
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
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 50,
  },
  brand: {
    fontSize: 22,
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
    padding: 20,
    borderRadius: 15,
    shadowColor: "black",
    backgroundColor: "#023047",
    width: '100%',
    height: 150,
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: {
      width: -2,
      height: 4,
    },
  },
  progressBar: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
