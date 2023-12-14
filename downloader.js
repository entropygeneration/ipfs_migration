import { readFile, readdir } from 'node:fs/promises';
import { createWriteStream } from 'fs';
import axios from 'axios';

export const generalGetRequest = async (url) => {
	try {
		const resp = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
          });
		return resp.data;
	} catch (err) {
		// Handle Error Here
		console.error(err);
	}
};

async function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function download(path, url, token) {
	const file = await readFile(path, 'utf-8');
	const preExisting = await readdir('data');
	
	const data = JSON.parse(file);
		
	for (let item of data) {
		// check for pre-existing files and skip
		// this is failsafe for second attempts incase failure
		if(preExisting.includes(item.cid)) {
			continue;
		} else {
			try {
				const cid = item.cid.replace('ipfs://', '')
				console.log(`Fetching: ${cid}`)
				const img = await generalGetRequest(`${url}${cid}${token}`);
				/*
				if (item.filename) {
					await img.pipe(createWriteStream(`data/${item.filename}`));
				} else {
					await img.pipe(createWriteStream(`data/${cid}`));
				}
				*/
				await img.pipe(createWriteStream(`data/${cid}`));
				await sleep(3500);
			} catch (err) {
				console.log(err)
				continue;
			}
		}
	}
}

const path = 'cid_list.json'
const url = 'https://<YOUR_URL>.mypinata.cloud/ipfs/';
const token = '?pinataGatewayToken=<YOUR_TOKEN>';

await download(path, url, token);