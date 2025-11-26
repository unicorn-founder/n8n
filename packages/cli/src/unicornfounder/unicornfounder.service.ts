import { Service } from '@n8n/di';
import { CredentialsEntity, ICredentialsDb } from '@n8n/db';
import { UrlService } from '@/services/url.service';

@Service()
export class UnicornFounderService {
	constructor(private readonly urlService: UrlService) {}

	getUnicornFounderApiKey() {
		return '2e44dcd0-cfab-4b34-b16b-f12b0b794e42';
	}

	getWorkspace() {
		const workspace = this.urlService.getWorkspace();
		return workspace === 'localhost' ? 'unicornfounder' : workspace;
	}

	getApiBaseUrl() {
		const isLocalExecution = this.urlService.getWebhookBaseUrl().includes('localhost');
		return isLocalExecution ? 'http://localhost:3000' : 'https://app.unicornfounder.ai';
	}

	async fetchCredentialsForWorkspace(): Promise<CredentialsEntity[]> {
		const res = await fetch(
			`${this.getApiBaseUrl()}/api/workspaces/${this.getWorkspace()}/secrets`,
			{
				method: 'GET',
				headers: {
					Authorization: this.getUnicornFounderApiKey(),
				},
			},
		);
		const responseBody = await res.json();
		return responseBody.data.map((secret: CredentialsEntity) => secret);
	}

	async updateCredential(newCredentialData: ICredentialsDb): Promise<CredentialsEntity> {
		const res = await fetch(
			`${this.getApiBaseUrl()}/api/workspaces/${this.getWorkspace()}/secrets/${newCredentialData.id}`,
			{
				method: 'PATCH',
				headers: {
					Authorization: this.getUnicornFounderApiKey(),
				},
				body: JSON.stringify(newCredentialData),
			},
		);
		return (await res.json()).data as CredentialsEntity;
	}

	async createCredential(credential: CredentialsEntity) {
		await fetch(
			`${this.getApiBaseUrl()}/api/workspaces/${this.getWorkspace()}/secrets/${credential.id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: this.getUnicornFounderApiKey(),
				},
				body: JSON.stringify(credential),
			},
		);
	}

	async deleteCredential(credentialId: string) {
		await fetch(
			`${this.getApiBaseUrl()}/api/workspaces/${this.getWorkspace()}/secrets/${credentialId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: this.getUnicornFounderApiKey(),
				},
			},
		);
	}
}
