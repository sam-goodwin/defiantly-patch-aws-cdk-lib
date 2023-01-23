const path = require("path");
const fs = require("fs/promises");
const { constants } = require("fs");

async function main() {
  const pkgJsonPath = await findCDKPackageJson(__dirname);
  const pkgJson = JSON.parse(await fs.readFile(pkgJsonPath));
  pkgJson.exports["./core"] = "./core/index.js";
  await fs.writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
}

async function findCDKPackageJson(dir) {
  if (dir === "/") {
    return undefined;
  }
  console.log(dir, path.basename(dir));

  if (await exists(path.join(dir, "node_modules"))) {
    return findCDKPackageJson(path.join(dir, "node_modules"));
  } else if (path.basename(dir) === "node_modules") {
    const pkgJsonPath = path.join(dir, "aws-cdk-lib", "package.json");
    await fs.access(pkgJsonPath, constants.W_OK);
    return pkgJsonPath;
  } else {
    return findCDKPackageJson(path.dirname(dir));
  }
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

main().catch((err) => {
  console.error(err);
});
