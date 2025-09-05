import Link from "next/link";

export default function Kontakt() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-12">Kontakt</h1>
          <div className="mb-8 text-left mt-8">
            <h2 className="text-3xl font-bold mb-3">Signal</h2>
            <p className="text-xl text-muted-foreground">
              Mein bevorzugter Messenger ist Signal.
            </p>
            <p className="text-xl text-muted-foreground">
              Du kannst dir Signal für Android oder iOS hier
              herunterladen:&nbsp;
              <Link
                href={"https://signal.org/de/download"}
                className="text-accent-foreground"
              >
                signal.org/de/download
              </Link>
            </p>
            <p className="text-xl text-muted-foreground">
              Wenn du meine Nummer schon hast, solltest du mich automatisch
              finden. Ansonsten kannst du mich über meinen Username&nbsp;
              <code className="text-accent-foreground">@MarcRnt.98</code>&nbsp;
              adden.
            </p>
          </div>
          <div className="mb-8 text-left mt-4">
            <h2 className="text-3xl font-bold mb-3">Threema</h2>
            <p className="text-xl text-muted-foreground">
              Alternativ bin ich auch auf Threema erreichbar.
            </p>
            <p className="text-xl text-muted-foreground">
              Threema kann man für Android oder iOS hier herunterladen:&nbsp;
              <Link
                href={"https://threema.ch/de/download"}
                className="text-accent-foreground"
              >
                https://threema.ch/de/download
              </Link>
            </p>
            <p className="text-xl text-muted-foreground">
              Wenn du meine Nummer schon hast, solltest du mich automatisch
              finden. Ansonsten kannst du mich über meine ID &nbsp;
              <code className="text-accent-foreground">WXYVJD67</code>&nbsp;
              adden.
            </p>
          </div>
          <div className="mb-8 text-left mt-4">
            <h2 className="text-3xl font-bold mb-3">WhatsApp</h2>
            <p className="text-xl text-muted-foreground">
              Ich hasse WhatsApp, aber wenn es unbedingt sein muss...
            </p>
            <p className="text-xl text-muted-foreground">
              Wenn du meine Nummer schon hast, solltest du mich automatisch
              finden. Aber bitte verwende eine der beiden anderen Apps, wenn
              möglich.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
