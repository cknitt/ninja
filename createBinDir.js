// Create bin dir for CI

const fs = require("fs");
const path = require("path");

const platform = process.platform;
const arch = process.arch;

const binDir = platform === "darwin" ? platform + arch : platform;
const binPath = path.join(__dirname, "..", binDir);

fs.mkdirSync(binPath);
