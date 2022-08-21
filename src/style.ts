import { color } from './colors';
import { markdown, mdOptionsList } from './md';
import { Color, colors, IOptions } from './model';
function isMarkdownOptions(options: Partial<IOptions>) {
    return mdOptionsList.some(key => key in options);
}
function styleImpl(text: string, options: Partial<IOptions>) {
    if (text.length === 0) {
        return text;
    }
    if ('font' in options || 'background' in options || 'effects' in options) {
        return color(text, options);
    }
    if (isMarkdownOptions(options)) {
        return markdown(text, options);
    }
    return text;
}
const colorsObj = new Map<string, (text: string) => void>(
    colors.map(color => [color, text => console.log(style(text, { font: color }))]),
);
export const style = Object.assign(styleImpl, {
    log: (text: string, options: Partial<IOptions>) => {
        console.log(style(text, options));
    },
    color: (x: Color) => {
        const log = colorsObj.get(x);
        return log || console.log;
    },
});
