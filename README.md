# Symbol Explorer

[![Build Status](https://travis-ci.com/nemgrouplimited/symbol-explorer.svg?branch=main)](https://travis-ci.com/nemgrouplimited/symbol-explorer)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Symbol Explorer is a read-only web application to browse the content of the blockchain.
The explorer supports searching for transactions, accounts, namespaces, mosaics, and blocks information on a given network.

## Requirements

- Node.js 8, 9 or 10

## Installation

1. Clone the project.

```
git clone https://github.com/nemgrouplimited/symbol-explorer.git
```

2. Install the required dependencies.

```
cd symbol-explorer
npm install
```

3. Run the explorer application.

```
npm run dev
```

4. Visit http://localhost:8080/#/ in your browser.

## Developer notes

### Architecture

* `/src/config`: Handles the explorer configuration.
* `/src/infrastructure`: Handles the API / SDK request from Symbol nodes.
* `/src/store`: Handles the application logic with state management.
* `/src/views`: Handles the UI of the explorer.

### How to change the node list

The file `/src/config/setup.json.mt` contains the node list shown in the node selector dropdown.

1. Edit `peersApi.nodes` array to set up the custom node list.
2. Set `peersApi.defaultNode` property to the default node url.

## Getting help

Use the following available resources to get help:

- [Symbol Documentation][docs]
- Join the community [slack group (#sig-client)][slack]
- If you found a bug, [open a new issue][issues]

## Contributing

Contributions are welcome and appreciated.
Check [CONTRIBUTING](CONTRIBUTING.md) for information on how to contribute.

## License

Copyright 2019-present NEM

Licensed under the [Apache License 2.0](LICENSE)

[self]: https://github.com/nemgrouplimited/symbol-explorer
[docs]: https://nemtech.github.io
[issues]: https://github.com/nemgrouplimited/symbol-explorer/issues
[slack]: https://join.slack.com/t/nem2/shared_invite/enQtMzY4MDc2NTg0ODgyLWZmZWRiMjViYTVhZjEzOTA0MzUyMTA1NTA5OWQ0MWUzNTA4NjM5OTJhOGViOTBhNjkxYWVhMWRiZDRkOTE0YmU
