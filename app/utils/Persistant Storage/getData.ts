import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key: string) => {
    try {
        const data = await AsyncStorage.getItem(key);

        if(data !== null) {
            return data
        }
        return null;
    } catch (e) {
        console.log(e)
    }
}

export default getData;