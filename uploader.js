import pinataSDK from '@pinata/sdk';
import { readdir } from 'node:fs/promises';
import { createReadStream } from 'fs';

// change values for apiKey and secret to the ones created for your new account
const apiKey = 'YOUR KEY';
const secret = 'YOUR SECRET';

const pinata = new pinataSDK({ pinataApiKey: apiKey, pinataSecretApiKey: secret });

async function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

const fileList = await readdir('data');

try {
	for (let item of fileList) {
		//console.log(item);
		const readableStreamForFile = createReadStream(`data/${item}`);
		const options = {
			pinataMetadata: {
				name: item,
				/*
				keyvalues: {
					customKey: 'customValue',
					customKey2: 'customValue2'
				}
				*/
			},
			pinataOptions: {
				cidVersion: 0
			}
		};

		const upload = await pinata.pinFileToIPFS(readableStreamForFile, options);
		console.log(`Pinned: ${upload.IpfsHash} at: ${upload.Timestamp}`);
		
		await sleep(335);
	}
} catch (err) {
	console.log(err)
}