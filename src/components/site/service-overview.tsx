type Block = { type: "h" | "p"; text: string };

function overviewBlocks(text: string): Block[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];

  const flush = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "p", text: paragraph.join("\n") });
    paragraph = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (!trimmed) {
      flush();
      continue;
    }
    if (heading) {
      flush();
      blocks.push({ type: "h", text: heading[2].trim() });
      continue;
    }
    paragraph.push(line.replace(/^#{1,6}\s+/, ""));
  }
  flush();
  return blocks;
}

export function ServiceOverview({ text }: { text: string }) {
  const blocks = overviewBlocks(text);
  if (!blocks.length) return null;

  return (
    <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
      {blocks.map((block, index) =>
        block.type === "h" ? (
          <h3 key={index} className="font-display text-2xl text-navy">
            {block.text}
          </h3>
        ) : (
          <p key={index} className="whitespace-pre-line">
            {block.text}
          </p>
        ),
      )}
    </div>
  );
}
