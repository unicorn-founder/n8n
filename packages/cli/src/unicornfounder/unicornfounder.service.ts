import { Service } from '@n8n/di';
import { CredentialsEntity, ICredentialsDb } from '@n8n/db';

@Service()
export class UnicornFounderService {
	baseUrl: string;

	constructor() {
		this.baseUrl = process.env.UNICORN_FOUNDER_API_URL;
	}

	async fetchCredentialsForWorkspace(): Promise<CredentialsEntity[]> {
		const res = await fetch(`${this.baseUrl}/api/workspaces/unicornfounder/secrets`, {
			method: 'GET',
		});
		const responseBody = await res.json();
		return responseBody.data.map((secret: CredentialsEntity) => secret);
	}

	async updateCredential(newCredentialData: ICredentialsDb): Promise<CredentialsEntity> {
		const res = await fetch(
			`${this.baseUrl}/api/workspaces/unicornfounder/secrets/${newCredentialData.id}`,
			{
				method: 'PATCH',
				body: JSON.stringify(newCredentialData),
			},
		);
		return (await res.json()).data as CredentialsEntity;
	}

	async createCredential(credential: CredentialsEntity) {
		await fetch(`${this.baseUrl}/api/workspaces/unicornfounder/secrets/${credential.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credential),
		});
	}

	async deleteCredential(credentialId: string) {
		await fetch(`${this.baseUrl}/api/workspaces/unicornfounder/secrets/${credentialId}`, {
			method: 'DELETE',
		});
	}
}
