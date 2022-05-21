//@ts-check
var child = require("child_process");
var fs = require("fs");
var os = require("os");
const path = require("path");
var platform = process.platform;
var command = "python configure.py --bootstrap --verbose";
function build() {
  if (platform === "win32") {
    // running on visual studio command line
    child.execSync(command, { cwd: __dirname });
  } else {
    if (platform === "darwin") {
      process.env["CXXFLAGS"] = "-flto";
    }
    child.execSync(command, { stdio: [0, 1, 2], cwd: __dirname });
    child.execSync(`strip ninja`, { stdio: [0, 1, 2], cwd: __dirname });
  }
}
exports.build = build;

/**
 * @type{string}
 */
var dst;
if (platform === 'darwin') {
  dst = path.join(__dirname, "..", platform + process.arch, `ninja.exe`);
} else {
  dst = path.join(__dirname, "..", platform, `ninja.exe`);
}

if (require.main === module) {
  build();
  var src = path.join(__dirname, `ninja${platform === "win32" ? ".exe" : ""}`);

  fs.copyFileSync(src, dst);
}
