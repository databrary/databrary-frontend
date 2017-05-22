import os from "os";
const ifaces = os.networkInterfaces();

let addr = "128.122.236.148";

// Object.keys(ifaces).forEach(function (ifname) {
//     let alias = 0;
//
//     ifaces[ifname].forEach(function (iface) {
//         console.log(iface);
//         if ('IPv4' !== iface.family || iface.internal !== false) {
//             // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
//             return;
//         }
//         if (ifname.indexOf("docker")>-1) { return }
//         else if (alias >= 1) {
//             // this single interface has multiple ipv4 addresses
//             console.log(ifname + ':' + alias, iface.address);
//         } else {
//             // this interface has only one ipv4 adress
//             console.log(ifname, iface.address);
//             addr = iface.adapter;
//
//         }
//         ++alias;
//     });
// });
console.log("hello");
let domainPort = "3444";
let staticPort = "3444";
let config = {
    "domain": `http://${addr}:${domainPort}`,
    "static": `http://${addr}:${staticPort}/public`
};
export default config;