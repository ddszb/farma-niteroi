import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import Med from '../Models/Med';
import {StorageService} from '../services';

export enum DosesFilter {
	ALL = '0',
	NOT_TAKEN = '1',
	TAKEN = '2',
}
export enum MedsFilter {
	ALL = '0',
	CURRENT = '1',
}

interface ContextData {
	meds: Med[];
	darkMode: boolean;
	dosesFilter: DosesFilter;
	medsFilter: MedsFilter;
	saveMed(med: Med): Promise<void>;
	toggleDarkMode(): Promise<void>;
}

const MyContext = createContext<ContextData>({} as ContextData);

const ContextProvider: React.FC = ({children}) => {
	const [meds, setMeds] = useState<Med[]>([]);
	const [dosesFilter, setDosesFilter] = useState(DosesFilter.ALL);
	const [medsFilter, setMedsFilter] = useState(MedsFilter.ALL);
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		(async () => {
			const savedMeds = await StorageService.retrieve('medsList');
			const savedDosesFilter = await StorageService.retrieve('homeFilter');
			const savedMedsFilter = await StorageService.retrieve('medsFilter');
			const isDarkMode = await StorageService.retrieve('darkMode');
			if (savedMeds) {
				setMeds(JSON.parse(savedMeds) as Med[]);
			}
			if (savedDosesFilter) {
				setDosesFilter(savedDosesFilter as DosesFilter);
			}
			if (savedMedsFilter) {
				setMedsFilter(savedMedsFilter as MedsFilter);
			}
			setDarkMode(!!isDarkMode);
		})();
	}, []);

	const saveMed = useCallback(
		async (med: Med): Promise<void> => {
			let curr = meds.findIndex(m => m.id === med.id);
			if (curr) {
				meds[curr] = med;
			} else {
				meds.push(med);
			}
			setMeds({...meds});
			await StorageService.save('medsList', JSON.stringify(meds));
		},
		[meds],
	);

	const toggleDarkMode = useCallback(async (): Promise<void> => {
		setDarkMode(!darkMode);
		console.log('DARKMODE:', !darkMode);
		await StorageService.save('darkMode', String(!darkMode));
	}, []);

	return (
		<MyContext.Provider
			value={{
				meds,
				dosesFilter,
				medsFilter,
				darkMode,
				saveMed,
				toggleDarkMode,
			}}>
			{children}
		</MyContext.Provider>
	);
};

function getContext(): ContextData {
	const context = useContext(MyContext);
	if (!context) {
		throw new Error('getContext deve ser usado com um provider');
	}
	return context;
}

export {ContextProvider as AppProvider, getContext};
