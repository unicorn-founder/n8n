import { Service } from '@n8n/di';
import { ICredentialDataDecryptedObject } from 'n8n-workflow';

@Service()
export class UnicornFounderService {
	constructor() {}

	getApiBaseUrl(isLocalExecution: boolean) {
		return isLocalExecution ? 'http://localhost:3000' : 'https://app.unicornfounder.ai';
	}

	getUnicornFounderApiKey() {
		return '2e44dcd0-cfab-4b34-b16b-f12b0b794e42';
	}

	async logCredentialUsage(credential: ICredentialDataDecryptedObject | undefined) {
		if (credential === undefined) {
			return;
		}
		// ~
		const allowedDomain = credential['allowedDomains'] as string;
		const credentialId = credential['credentialId'] as string;
		let isLocalExecution = false;
		if (allowedDomain.includes('localhost')) {
			isLocalExecution = true;
		}
		// ~
		await fetch(
			`${this.getApiBaseUrl(isLocalExecution)}/api/admin/traces/secrets/${credentialId}`,
			{
				method: 'POST',
				headers: {
					Authorization: this.getUnicornFounderApiKey(),
				},
			},
		);
	}
}
