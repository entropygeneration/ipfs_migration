import pinataSDK from '@pinata/sdk';
import { readFile, writeFile } from 'node:fs/promises';

const apiKey = 'YOUR_KEY';
const secret = 'YOUR_SECRET';
const pinata = new pinataSDK({ pinataApiKey: apiKey, pinataSecretApiKey: secret });

async function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

const filters = {
	status : 'pinned',
    //status : 'all',
    //pageLimit: 10,
    //pageOffset: 0,
    //metadata: metadataFilter
};

const total = await pinata.userPinnedDataTotal();
//console.log(total)
let cidList = [];
let count = 1;
for await (const item of pinata.getFilesByCount(filters)) {
    console.log(`${count} / ${total.pin_count}: ${item.ipfs_pin_hash}`);
	//console.log(item);
	cidList.push(
		{
			cid: item.ipfs_pin_hash,
			date: item.date_pinned,
			filename: item.metadata.name
		}
	);
	await sleep(335);
	
	// Debug - 10 item limit
	//if (count > 10) break;
	count++
}

await writeFile('cid_list.json', JSON.stringify(cidList, null, 4));
//console.log(cidList)