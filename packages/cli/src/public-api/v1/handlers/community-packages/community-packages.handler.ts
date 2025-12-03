import { Container } from '@n8n/di';
import type { Response } from 'express';

import type { CommunityPackagesRequest } from '@/public-api/types';

export = {
	importCommunityPackage: [
		async (req: CommunityPackagesRequest.Install, res: Response): Promise<Response> => {
			try {
				const { CommunityPackagesService } = await import(
					'@/modules/community-packages/community-packages.service'
				);
				await Container.get(CommunityPackagesService).installPackage(req.body?.packageName);
				return res.status(200).send();
			} catch (error) {
				return res.status(500).json(error);
			}
		},
	],
	isPackageInstalled: [
		async (req: CommunityPackagesRequest.Check, res: Response): Promise<Response> => {
			const { name: packageName } = req.params;
			try {
				const { CommunityPackagesService } = await import(
					'@/modules/community-packages/community-packages.service'
				);
				const isInstalled =
					await Container.get(CommunityPackagesService).isPackageInstalled(packageName);
				return res.status(isInstalled ? 200 : 404).send();
			} catch (error) {
				return res.status(500).json(error);
			}
		},
	],
};
