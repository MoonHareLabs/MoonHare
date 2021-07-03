export default function generate(object) {
    const selectors = Object.keys(object)
    return selectors.map((selector) => {
      const definition = object[selector]
      const rules = Object.keys(definition)
      const result = rules.map((rule) => {
        return `${rule}:${definition[rule]}`
      }).join(';')
      return `${selector}{${result}}`
    }).join('\n')
}
