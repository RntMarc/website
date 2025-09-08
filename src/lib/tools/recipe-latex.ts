export function latexEscape(input: string) {
  // Escapes LaTeX-reservierte Zeichen
  return input
    .replace(/([#\$%&\_\{\}~^\\])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}");
}

export function buildLeftContent(
  categories: { name: string; items: string[] }[]
) {
  return categories
    .map((cat) => {
      let out = `\\IngredientCategory{${latexEscape(cat.name)}}\n`;
      out += cat.items.map((i) => `\\Ingredient{${latexEscape(i)}}\n`).join("");
      return out;
    })
    .join("\n");
}

export function buildSteps(steps: string[]) {
  return steps.map((s) => `  \\item ${latexEscape(s)}`).join("\n");
}
