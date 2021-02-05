const fs = require('fs');
const glob = require('glob');
const path = require('path');
const webfontsGenerator = require('@vusion/webfonts-generator');
const mkdirp = require('mkdirp');

const themesDir = process.argv[2] || '';
const selectedTheme = process.argv[3];

const formats = ['woff'];
const mimeTypes = {
    eot: 'application/vnd.ms-fontobject',
    svg: 'image/svg+xml',
    ttf: 'application/x-font-ttf',
    woff: 'application/font-woff',
    woff2: 'font/woff2'
};

// find names of themes with an icons folder
const themes = glob.sync(path.join(themesDir, 'ag-theme-*/icons'))
        .map(item => /ag-theme-(.*)\//.exec(item)[1]);

const generate = (theme) => {
    const fontName = theme === 'base'
        ? 'agGridClassic'
        : ('agGrid' + theme[0].toUpperCase() + theme.substring(1));
    const themeFolder = path.join(themesDir, `ag-theme-${theme}`);
    const destFolder = path.join(themeFolder, 'sass');
    const iconsFolder = path.join(themeFolder, 'icons/*.svg')
    console.log(`Generating webFont for ${theme} theme into ${destFolder}`)
    webfontsGenerator(
        {
            files: glob.sync(iconsFolder),
            writeFiles: false,
            scssFile: true,
            fontName: fontName,
            fontHeight: 1000,
            templateOptions: {
                classPrefix: 'ag-icon-',
                baseSelector: '.ag-icon',
                theme
            },
            types: formats,
            fixedWidth: false,
            dest: destFolder,
            cssTemplate: path.join(themesDir, 'scss-template.hbs'),
        },
        (err, res) => {
            if (err) {
                console.log(err);
                process.exit();
            }

            var urls = {};
            for (var i in formats) {
                var format = formats[i];
                urls[format] = 'data:' + mimeTypes[format] + ';charset=utf-8;base64,' + Buffer.from(res[format]).toString('base64');
            }

            const scssContents = res.generateCss(urls);

            mkdirp.sync(destFolder);
            fs.writeFileSync(`${destFolder}/_ag-theme-${theme}-font-vars.scss`, scssContents);
        }
    );
}

if (!selectedTheme) {
    themes.forEach(generate);
} else {
    if (themes.includes(selectedTheme)) {
        generate(selectedTheme);
    } else {
        console.error(`No such theme '${selectedTheme}', try one of: ${themes.join(', ')}.`);
    }
}