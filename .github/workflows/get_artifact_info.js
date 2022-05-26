const artifactPath =
  process.platform === "darwin"
    ? process.platform + process.arch
    : process.platform;

const artifactName = "ninja-" + artifactPath;

// Pass artifactPath and artifactName to subsequent GitHub actions
console.log(`::set-output name=artifact_path::${artifactPath}`);
console.log(`::set-output name=artifact_name::${artifactName}`);
