const parse_html = require("../mediawiki-services-parsoid/lib/parse.js");

const obj =  {
    input: '',

    mode: 'wt2html',
    parsoidOptions: {
      linting: false,
      loadWMF: true,
      useWorker: false,
      fetchConfig: true,
      fetchTemplates: true,
      fetchImageInfo: true,
      expandExtensions: true,
      rtTestMode: false,
      addHTMLTemplateParameters: false,
      usePHPPreProcessor: true
    },
    envOptions: {
      domain: 'en.wikipedia.org',
      prefix: null,
      pageName: '',
      scrubWikitext: false,
      pageBundle: false,
      wrapSections: false,
      logLevels: [ 'fatal', 'error', 'warn' ]
    },
    oldid: null,
    selser: undefined,
    pb: undefined,
    contentmodel: null,
    outputContentVersion: '2.1.0',
    body_only: false
  }


const hoxy= async(wt)=>{
  var input = ''
  wt.map(function(element){
    input += element.text
});
  obj.input = input
  console.log("wt:", input)
  var x = await parse_html(obj)
  console.log(x)
  return x
  // return(x.html)
}

module.exports.hoxy = hoxy;
