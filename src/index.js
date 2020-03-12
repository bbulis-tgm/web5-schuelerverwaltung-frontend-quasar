module.exports = function (api) {
  api.extendQuasarConf(extendConf)
}

function extendConf (conf) {
  conf.boot.push('~schuelerverwaltung/src/boot/components.js')
  console.trace();
}