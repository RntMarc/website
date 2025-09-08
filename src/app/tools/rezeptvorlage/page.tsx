"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function RecipeBuilderPage() {
  const [title, setTitle] = useState("");
  const [timeblock, setTimeblock] = useState("");
  const [categories, setCategories] = useState([{ name: "", items: [""] }]);
  const [steps, setSteps] = useState([""]);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showLatex, setShowLatex] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleGeneratePdf = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("timeblock", timeblock);
    formData.append("categories", JSON.stringify(categories));
    formData.append("steps", JSON.stringify(steps));
    if (imageFile) formData.append("image", imageFile);

    const resp = await fetch("/api/generate-pdf", {
      method: "POST",
      body: formData,
    });
    if (resp.ok) {
      const blob = await resp.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } else {
      alert("Fehler beim Erstellen der PDF");
    }
  };

  const generateLatex = () => {
    const texContent = categories
      .map(
        (cat) =>
          `\\IngredientCategory{${cat.name}}\n${cat.items
            .map((i) => `\\Ingredient{${i}}`)
            .join("\n")}`
      )
      .join("\n");

    const stepsContent = steps.map((s) => `\\item ${s}`).join("\n");

    return `
\\documentclass[12pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{helvet}\\renewcommand{\\familydefault}{\\sfdefault}
\\usepackage[left=3cm,right=1.5cm,top=2cm,bottom=2cm]{geometry}
\\usepackage{paracol}\\setlength{\\columnsep}{1.25cm}\\columnratio{0.3062295,0.6937705}
\\usepackage{enumitem}\\usepackage{xcolor}\\usepackage{setspace}\\usepackage{pifont}
\\setlength{\\parindent}{0pt}
\\sloppy\\emergencystretch=1em

\\newcommand{\\RecipeTitle}[1]{{\\fontsize{25pt}{25pt}\\selectfont #1\\par\\vspace{0.14cm}}}
\\newcommand{\\IngredientCategory}[1]{\\vspace{0.45cm}{\\fontsize{14pt}{16.1pt}\\selectfont\\bfseries\\textcolor[HTML]{2E75B5}{#1}\\par\\vspace{0.35cm}}}
\\newcommand{\\Ingredient}[1]{{\\fontsize{11pt}{12.65pt}\\selectfont\\bfseries #1\\par\\vspace{0.35cm}}}
\\newcommand{\\TimeBlock}[1]{{\\fontsize{11pt}{11pt}\\selectfont \\ding{72}\\ #1\\par\\vspace{0.75cm}}}

\\newlist{recipesteps}{enumerate}{1}
\\setlist[recipesteps]{label*=\\arabic*., left=3.1pt, labelsep=18.2pt, labelwidth=18.2pt, listparindent=0pt, itemsep=0.35cm, parsep=0pt, topsep=0pt, font=\\fontsize{11pt}{12.65pt}\\selectfont}

\\begin{document}
\\RecipeTitle{${title}}
\\vspace{0.2cm}
\\begin{paracol}{2}
\\begin{leftcolumn}
\\TimeBlock{${timeblock}}

${texContent}
\\end{leftcolumn}
\\begin{rightcolumn}
\\begin{recipesteps}
${stepsContent}
\\end{recipesteps}

\\vspace{1em}
%%IMAGEBOX%%
\\end{rightcolumn}
\\end{paracol}
\\end{document}
    `;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <Card className="flex-1">
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Input
              placeholder="Titel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Vorbereitung/Kochzeit"
              value={timeblock}
              onChange={(e) => setTimeblock(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="block font-medium">Bild (optional)</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            {categories.map((c, i) => (
              <div key={i} className="border rounded p-3 space-y-2">
                <Input
                  placeholder="Kategorie"
                  value={c.name}
                  onChange={(e) => {
                    const newC = [...categories];
                    newC[i].name = e.target.value;
                    setCategories(newC);
                  }}
                />
                {c.items.map((it, j) => (
                  <Input
                    key={j}
                    placeholder="Zutat"
                    value={it}
                    onChange={(e) => {
                      const newC = [...categories];
                      newC[i].items[j] = e.target.value;
                      setCategories(newC);
                    }}
                  />
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newC = [...categories];
                    newC[i].items.push("");
                    setCategories(newC);
                  }}
                >
                  Zutat hinzufügen
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                setCategories([...categories, { name: "", items: [""] }])
              }
            >
              Kategorie hinzufügen
            </Button>
          </div>

          <div className="space-y-2">
            {steps.map((s, i) => (
              <Textarea
                key={i}
                value={s}
                onChange={(e) => {
                  const newS = [...steps];
                  newS[i] = e.target.value;
                  setSteps(newS);
                }}
              />
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSteps([...steps, ""])}
            >
              Schritt hinzufügen
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleGeneratePdf}>PDF erzeugen</Button>
            <Button variant="outline" onClick={() => setShowLatex(!showLatex)}>
              LaTeX-Code anzeigen
            </Button>
          </div>

          {showLatex && (
            <Card className="p-3 bg-gray-50 overflow-x-auto">
              <pre className="whitespace-pre-wrap">{generateLatex()}</pre>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="flex-1">
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            className="w-full h-[80vh] border rounded"
            title="PDF-Vorschau"
          />
        )}
      </div>
    </div>
  );
}
