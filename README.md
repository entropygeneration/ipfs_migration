# ipfs migration tool
scripts to build list of pinned items, download them from ipfs and then re-upload to new account

## Usage:
- pause / disable any ipfs activity (such as the locking functionality on website)
- run `node scraper.js` to generate a json of all pinned items on account
- run `node downloader.js` to download all items in json list to data folder
- run `node uploader.js` once all files have been downloaded to upload to new account. be sure to update api key and secret variables in file.
