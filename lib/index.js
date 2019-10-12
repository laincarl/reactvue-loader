const qs = require('querystring')
module.exports = function (content) {
  console.log('enter')
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
  const { lang, js, css } = parseStyleTag(content)
  const rawQuery = resourceQuery.slice(1)
  const incomingQuery = qs.parse(rawQuery)
  if (incomingQuery.type) {
    console.log(incomingQuery.type)
    // script
    if (incomingQuery.type === `script`) {
      // if (appendExtension) {
      //   loaderContext.resourcePath += '.' + (descriptor.script.lang || 'js')
      // }
      // loaderContext.callback(
      //   null,
      //   descriptor.script.content,
      //   descriptor.script.map
      // )
      return js;
    }

    // styles
    if (incomingQuery.type === `style` && incomingQuery.index != null) {
      // const style = descriptor.styles[incomingQuery.index]
      // if (appendExtension) {
      //   loaderContext.resourcePath += '.' + (style.lang || 'css')
      // }   
      // loaderContext.callback(
      //   null,
      //   style.content,
      //   style.map
      // )
      return css;
    }
  }

  const str = `
  import script from "${resourcePath}?reactvue&type=script&lang=js&"
  export * from "${resourcePath}?reactvue&type=script&lang=js&"
  import style0 from "${resourcePath}?reactvue&type=style&index=0&lang=css&"
  `
  console.log(resourcePath, str)
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