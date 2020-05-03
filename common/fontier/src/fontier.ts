const variantFontLocation = 'some.location';
const baseFontCss = `
    @supports (font-variation-settings: 'wdth' 9) {
        @font-face {
            font-family: 'BaseVonageFont';
            src: '${variantFontLocation}' format('woff2-variations');
            font-weight: 125 950;
            font-stretch: 75% 125%;
            font-style: normal;
        }
    }

    @supports not (font-fariation-settings: 'wdth' 9) {
        -- woff2 regular
    }
`;

const ds = document.createElement('style');
ds.type = 'text/css';
ds.innerHTML = baseFontCss;
document.body.appendChild(ds);