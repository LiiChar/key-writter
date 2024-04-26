import {
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';

type Config = {
	errorStop: boolean;
	wpsStatsType: 'double' | 'default';
	wpsStatsCount: number;
	keyboardVisible: boolean;
};

type InitialData = {
	config: Config;
	setConfig: React.Dispatch<React.SetStateAction<Config>>;
	setConfigPropery: <K extends keyof Config>(
		propery: K,
		value: Config[K]
	) => void;
	setDefaltValue: () => void;
};

const initialData: InitialData = {
	config: {
		errorStop: false,
		wpsStatsType: 'double',
		wpsStatsCount: 10,
		keyboardVisible: true,
	},
	setConfigPropery: (_propery, _value): void => {
		throw new Error('Function not implemented.');
	},
	setDefaltValue: (): void => {
		throw new Error('Function not implemented.');
	},
	setConfig: function (_value: SetStateAction<Config>): void {
		throw new Error('Function not implemented.');
	},
};

const ConfigContext = createContext<typeof initialData>(initialData);

export const useConfig = () => {
	return useContext(ConfigContext);
};

export const ConfigContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [config, setConfig] = useState<Config>(initialData.config);

	const setConfigPropery = <K extends keyof Config>(
		propery: K,
		value: Config[K]
	) => {
		setConfig(prev => {
			prev[propery] = value;
			return prev;
		});
	};

	const setDefaltValue = () => {
		setConfig(initialData.config);
	};

	const value = {
		config,
		setConfig,
		setDefaltValue,
		setConfigPropery,
	};

	return (
		<ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
	);
};
