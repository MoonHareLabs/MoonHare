import { Style } from '../../utils/style';
import { isString, increaseWithUnit } from '../../utils';
export function generateScreens(screens) {
    const variants = {};
    const breakpoints = Object.entries(screens).sort(([, sizeA], [, sizeB]) => sortWeight(sizeA) - sortWeight(sizeB));
    breakpoints.forEach(([name, size], index) => {
        if (isString(size)) {
            const [, nextSize] = breakpoints[index + 1] || [];
            variants[name] = styleForBreakpoint({ min: size });
            variants[`<${name}`] = styleForBreakpoint({ max: increaseWithUnit(size, -0.1) });
            variants[`@${name}`] = styleForBreakpoint(nextSize ? { min: size, max: increaseWithUnit(nextSize, -0.1) } : { min: size });
            variants[`-${name}`] = styleForBreakpoint({ max: size });
            variants[`+${name}`] = styleForBreakpoint(nextSize ? { min: size, max: nextSize } : { min: size });
        }
        else {
            variants[name] = styleForBreakpoint(size);
        }
    });
    return variants;
}
function styleForBreakpoint(rule) {
    const mediaConditions = 'raw' in rule ? rule.raw : [
        rule.min && `(min-width: ${rule.min})`,
        rule.max && `(max-width: ${rule.max})`,
    ].filter(condition => condition).join(' and ');
    return () => new Style().atRule(`@media ${mediaConditions}`);
}
// NOTE: Non-size breakpoints should come first, to avoid using them in the
// +breakpoint definition.
function sortWeight(breakpoint) {
    return isString(breakpoint) ? parseInt(breakpoint) : Number.NEGATIVE_INFINITY;
}
