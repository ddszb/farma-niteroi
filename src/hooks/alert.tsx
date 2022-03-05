import React, {createContext, useContext, useEffect, useState} from 'react';
import {MessageModalProps} from '../components/MessageModal';
import {MessageModal} from '../components';

type AlertContextProviderData = {
	loading: boolean;
	setLoading(value: boolean): void;
	showModal(
		title: string,
		mssage: string,
		onConfirm: () => void,
		onCancel: () => void,
		confirmLabel?: string,
		cancelLabel?: string,
	): void;
	closeModal: () => void;
};

const AlertContext = createContext<AlertContextProviderData>(
	{} as AlertContextProviderData,
);

export const AlertProvider: React.FC = ({children}) => {
	const [loading, setLoading] = useState(true);
	const [modalData, setModalData] = useState<MessageModalProps | null>();

	const closeModal = (): void => {
		setModalData(null);
	};

	const showModal = (
		title: string,
		message: string,
		onConfirm: () => void,
		onCancel: () => void,
		confirmLabel?: string,
		cancelLabel?: string,
	) => {
		setModalData({
			title,
			message,
			onCancel,
			onConfirm,
			confirmLabel,
			cancelLabel,
		});
	};

	return (
		<AlertContext.Provider
			value={{
				loading,
				setLoading,
				showModal,
				closeModal,
			}}>
			{modalData && <MessageModal {...modalData} />}
			{children}
		</AlertContext.Provider>
	);
};

export const useAlert = (): AlertContextProviderData =>
	useContext(AlertContext);
