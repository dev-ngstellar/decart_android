import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value,
    );
  } catch (e) {
    console.log(e);
  }
};

const getData = async key => {
  let value = null;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
  return value;
};

const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

export {storeData, getData, clearData};
