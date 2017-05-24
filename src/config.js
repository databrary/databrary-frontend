let addr = "172.22.236.163";

let domainPort = "3444";
let staticPort = "3444";
let config = {
    "domain": `https://${addr}:${domainPort}`,
    "static": `https://${addr}:${staticPort}/public`
};
export default config;