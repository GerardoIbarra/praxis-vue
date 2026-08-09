// Allow esbuild post-install script
function readPackage(pkg, context) {
  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
