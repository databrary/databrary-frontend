let addr = "localhost";

let domainPort = "3444";
let staticPort = "3444";
let config = {
    "domain": `https://${addr}:${domainPort}`,
    "static": `https://${addr}:${staticPort}/public`,
    "wss": `wss://${addr}:${domainPort}`,
};
export default config;
