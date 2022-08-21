import { backgroundColors, Color, Effect, effects, fontColors, IEffects, IOptions, Reset } from './model';
function addColor(text: string, color: Color, isBackground = false): string {
    if (isBackground) {
        return text + backgroundColors[color];
    }
    return text + fontColors[color];
}
function getEffects(effectList: Effect[]) {
    return effectList.map(effect => effects[effect]).join('');
}
export function color(text: string, options?: Partial<IOptions>): string {
    const preparedText = text.replace(/ё/g, 'е');
    let result: string = '';
    if (options) {
        if (options.font) {
            result = addColor(result, options.font);
        }
        if (options.background) {
            result = addColor(result, options.background, true);
        }
        if (options.effects) {
            result += getEffects(options.effects);
        }
        result += preparedText;
        result += Reset;
        return result;
    }
    return preparedText;
}
