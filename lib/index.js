const path = require('path');
const qs = require('querystring')
const loaderUtils = require('loader-utils');
module.exports = function (content) {

  const loaderContext = this;
  const {
    target,
    request,
    minimize,
    sourceMap,
    rootContext,
    resourcePath,
    resourceQuery
  } = loaderContext;
  const stringifyRequest = r => loaderUtils.stringifyRequest(loaderContext, r)
  const options = loaderUtils.getOptions(loaderContext) || {}

  const rawQuery = resourceQuery.slice(1)
  const incomingQuery = qs.parse(rawQuery)
  // console.log('enter', incomingQuery.type)
  const { lang, js, css } = parseStyleTag(content)
  const { appendExtension } = options;
  if (incomingQuery.type) {   
    // script
    if (incomingQuery.type === `script`) {
      // if (appendExtension) {
      //   loaderContext.resourcePath += '.' + ('js')
      // }
      loaderContext.callback(
        null,
        js,
        // descriptor.script.map
      )
      // console.log(js)
      return;
    }

    // styles
    if (incomingQuery.type === `style` && incomingQuery.index != null) {
      // const style = descriptor.styles[incomingQuery.index]
      // if (appendExtension) {
      //   loaderContext.resourcePath += '.' + (lang || 'css')
      // }
      loaderContext.callback(
        null,
        css,
        // style.map
      )
      return;
    }
  }
  // 绝对路径转换为相对路径，并且会自动JSON.stringfy,也就是加上引号
  const scriptImport = stringifyRequest(`${resourcePath}?reactvue&type=script&lang=js&`);
  const scriptExport = stringifyRequest(`${resourcePath}?reactvue&type=script&lang=js&`);
  const cssImport = stringifyRequest(`${resourcePath}?reactvue&type=style&index=0&module=${false}&lang=${lang}&`);
  const str = `
  import script from ${scriptImport}
  export * from ${scriptExport}
  import style from ${cssImport}
  `
  return str;
}
function parseStyleTag(source) {
  var js = source.split('<style')[0];
  var code = source.split('<style')[1];
  if (!code)
    return;
  var lang = (code.match(/lang='([^>]*)'/) || code.match(/lang="([^>]*)"/) || [])[1] || 'css';
  var secSplit = code.split('</style>');
  if (secSplit.length < 2)
    throw "Detected not closed <style> brace!";
  return {
    lang,
    css: secSplit[0].substr(secSplit[0].indexOf('>') + 1),
    js
  };
};
