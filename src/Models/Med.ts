import Dose from './Dose';

export enum MedStatus {
	INACTIVE = 0,
	ACTIVE = 1,
}

export type DoseUnit = {
	value: string;
	label: string;
	key: number;
	liquid: boolean;
};
export type WeekdaysKeys = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Weekdays = {
	0: number;
	1: number;
	2: number;
	3: number;
	4: number;
	5: number;
	6: number;
};

export type DoseHour = {
	time: Date;
	amount: number;
	unit: DoseUnit;
	index: number;
};

export type Stock = {
	amount: number;
	unit: DoseUnit;
};

export default class Med {
	id: string;
	name: string;
	expireDate?: Date;
	weekdays: Weekdays;
	totalDays: number;
	startDate: Date;
	scheduledDoses: boolean;
	icon: string;
	iconColor: string;
	notes: string;
	status: MedStatus;
	doseUnit: DoseUnit;
	doseHours: DoseHour[];
	stock: Stock;
	doses: Dose[];

	constructor() {
		this.id = Math.random().toString().substring(2, 9);
		this.name = '';
		this.weekdays = {0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1};
		this.totalDays = 7;
		this.startDate = new Date();
		this.scheduledDoses = false;
		this.icon = 'med_caps';
		this.iconColor = '#2196F3';
		this.notes = '';
		this.status = MedStatus.ACTIVE;
		this.doseUnit = {
			value: 'COMPRIMIDO',
			label: 'Comprimido',
			key: 1,
			liquid: false,
		};
		this.doseHours = [
			{time: new Date(), amount: 1, unit: this.doseUnit, index: 0},
		];
		this.stock = {
			amount: 0,
			unit: this.doseUnit,
		};
		this.doses = [];
	}
}
