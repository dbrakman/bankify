# Bankify
Bankify is a high-concept (read "nonfunctional") application for web and iOS formed by the amalgamation of hackathon projects by Michael Bonifonte, David Brakman, and Vadim Kudlay, nominally united by the idea of gamifying banking.

## Installation
1. Clone this repository and download the following prerequisites:
    - Node.js version 0.6 or higher
    - XCode version 7 or higher
2. Obtain an API key for Nessie by following the instructions at <http://api.reimaginebanking.com/>, and insert it on line 1 of `Balance_Tokenizer/client/scripts.js`.
3. From within the `Balance_Tokenizer` and `Transaction_Hero` folders, respectively, run `npm install`.


## Running
**Balance Tokenizer**: From within the `Balance_Tokenizer` folder, run `node app.js`, then visit localhost:2000 in a browser.

**Transaction Hero**: Launch a web server from within the `Transaction_Hero` folder and view the result in a browser. E.g., run `python -m SimpleHTTPServer`.

**IOS Interface**: Build and run via the XCode Project menu.
