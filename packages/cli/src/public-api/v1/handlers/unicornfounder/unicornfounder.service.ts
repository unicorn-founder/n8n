import { CredentialsEntity } from '@n8n/db';

export async function saveCredentialToUnicornFounder(credential: CredentialsEntity, host: string) {
	try {
		const res = await fetch(
			`${getApiBaseUrl(host)}/api/workspaces/${getWorkspace(host)}/secrets/${credential.id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: '2e44dcd0-cfab-4b34-b16b-f12b0b794e42',
				},
				body: JSON.stringify(credential),
			},
		);
		console.log(host, getWorkspace(host));
		console.log(
			await res.json(),
			`${getApiBaseUrl(host)}/api/workspaces/${getWorkspace(host)}/secrets/${credential.id}`,
		);
	} catch (e) {
		console.log(e);
	}
}

function getWorkspace(host: string) {
	const hostname = new URL(host.startsWith('http') ? host : 'https://' + host).hostname;
	const parts = hostname.split('.');
	return parts[0] === 'localhost' ? 'localhost' : parts[0];
}

function getApiBaseUrl(host: string) {
	const isLocalExecution = host.includes('localhost');
	return isLocalExecution ? 'http://localhost:3000' : 'https://app.unicornfounder.ai';
}
