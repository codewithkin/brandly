import { StyleSheet, View } from 'react-native';
import { useState } from "react";
import NewPostModal from "../../../components/NewPostModal";
import Posts from "../../../pages/Posts";
import PostActions from "../../../components/PostActions";
import { Stack } from "expo-router";
import { MaterialTopTabs } from './_layout';

export default function TabOneScreen() {
  const [fill, setFill] = useState(0);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      
      <Posts />
      <NewPostModal 
        hideModal={hideModal} 
        visible={visible} 
      />

      <PostActions 
      showModal={showModal}
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
