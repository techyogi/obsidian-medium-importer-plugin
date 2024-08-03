import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.env.npm_package_version;

console.log("Targeting verison:"+targetVersion);

// read minAppVersion from manifest.json and bump version to target version
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

let apackage = JSON.parse(readFileSync("package.json", "utf8"));
apackage.version = targetVersion;
writeFileSync("package.json", JSON.stringify(apackage, null, "\t"));

// update versions.json with target version and minAppVersion from manifest.json
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
