import {DoseUnit} from './Med';

export type Address = {
	streetName: string;
	number: string;
	neighborhood: string;
	city: string;
};

export default class HealthCenter {
	id: string;
	name: string;
	address: Address;
	phoneNumbers: string[];

	constructor(
		id: string,
		name: string,
		address: Address,
		phoneNumbers: string[],
	) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.phoneNumbers = phoneNumbers;
	}
}
