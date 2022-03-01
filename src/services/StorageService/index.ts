import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageKeys =
	| 'medsList'
	| 'lastAccess'
	| 'homeFilter'
	| 'medsFilter'
	| 'darkMode';

export const save = (key: StorageKeys, value: string): Promise<void> => {
	return AsyncStorage.setItem(`${key}`, value);
};

export const retrieve = async (key: StorageKeys): Promise<string | null> => {
	return AsyncStorage.getItem(`${key}`);
};

export const remove = (key: StorageKeys): Promise<void> => {
	return AsyncStorage.removeItem(`${key}`);
};

export const flushAllData = async (): Promise<boolean> => {
	await AsyncStorage.clear();
	return true;
};
