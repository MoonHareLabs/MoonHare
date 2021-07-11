class Layer {
    layers: [base, utilities, components]
}

export class Style {
    meta = { type: 'components', group: 'plugin', order: 0, offset: 0, corePlugin: false };
    selector = [];
    important = [];
    property = [];
    atRules = [];
    pseudoClasses = [];
    pseudoElements = [];
    parentSelectors = [];
    childSelectors = [];
    brotherSelectors = [];
    wrapProperties = [];
    wrapSelectors = [];
    wrapRules = [];
}

class StyleSheet {
    layers: [base, utilities, components]
}
