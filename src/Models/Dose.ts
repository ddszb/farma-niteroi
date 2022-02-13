import {DoseUnit} from './Med';

export default class Dose {
	id: string;
	medName: string;
	medId: string;
	date: Date;
	unit?: DoseUnit;
	amount: number;
	dateTaken?: Date;
	newDate?: Date;
	status: DoseStatus;
	icon: string;
	iconColor: string;
	index: number;
	sporadic: boolean;

	constructor(
		medName: string,
		medId: string,
		date: Date,
		amount: number,
		status: DoseStatus,
		icon: string,
		color: string,
		index: number,
		sporadic: boolean,
	) {
		this.id = Math.random().toString().substring(2, 9);
		this.medName = medName;
		this.medId = medId;
		this.date = date;
		this.amount = amount;
		this.status = status;
		this.icon = icon;
		this.iconColor = color;
		this.index = index;
		this.sporadic = sporadic;
	}
}
