const
    _ = require('lodash'),
    fp = require('lodash/fp'),
    fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    kefir = require('kefir'),
    minify = require('html-minifier').minify,
    cheerio = require('cheerio');

const sanitizeSvg = (svgText)=>{
    const
        $ = cheerio.load(svgText, { ignoreWhitespace: true }),
        svgEl = $('svg:first-child');

    _.keys(svgEl[0].attribs)
        .filter((attrName)=> !["viewBox", "xmlns"].includes(attrName))
        .forEach(_.unary(svgEl.removeAttr.bind(svgEl)));

    return minify(cheerio.html(svgEl), {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeEmptyAttributes: true,
        customAttrCollapse: /d/
    });
};

const esModuleTemplate = (svgContent)=>  `export default function(){ return \`${svgContent.replace(/`,/g, '\\``')}\`; }`;

kefir
    .fromNodeCallback(_.partial(glob,'./icons/*.svg', { cwd: __dirname, absolute: true }))
    .flatten()
    .flatMapConcurLimit((inputFile)=> {
        const baseName = path.basename(inputFile, '.svg').match(/^Vlt-icon-(.+)/)[1];
        return kefir
            .fromNodeCallback(_.partial(fs.readFile, inputFile, 'utf8'))
            .map(_.flow(sanitizeSvg, (svg)=> ({ name: baseName, svg })));
    }, 5)
    .flatMap(({ name, svg })=> {
        const filename = [name, "js"].join('.');
        return kefir
            .fromNodeCallback(_.partial(fs.writeFile, path.join(__dirname, "modules", filename), esModuleTemplate(svg)))
            .map(_.constant({ name, filename }));
    })
    .scan((ac, v)=> ac.concat(v), [])
    .last()
    .onValue((manifest)=> fs.writeFileSync('manifest.json', JSON.stringify(manifest)));