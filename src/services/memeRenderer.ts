function loadImageFromFile(imageFile: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(imageFile);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
    img.decoding = "async";
    img.crossOrigin = "anonymous";
  });
}

function getFileNameWithSuffix(
  originalName: string,
  suffix: string,
  extension: string
): string {
  const dotIndex = originalName.lastIndexOf(".");
  const base = dotIndex > 0 ? originalName.slice(0, dotIndex) : originalName;
  return `${base}${suffix}.${extension}`;
}

function wrapTextToLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const { width } = ctx.measureText(testLine);
    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export async function renderMemeWithTopCaption(
  imageFile: File,
  captionText: string
): Promise<File> {
  const image = await loadImageFromFile(imageFile);

  // Dynamic sizing and typography
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");

  const width = image.naturalWidth || image.width;
  const fontSize = Math.max(24, Math.round(width * 0.055));
  const horizontalPadding = Math.round(width * 0.06);
  const maxTextWidth = width - horizontalPadding * 2;
  const lineHeight = Math.round(fontSize * 1.25);

  ctx.font = `${fontSize}px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`;
  ctx.textBaseline = "top";

  const lines = wrapTextToLines(ctx, captionText.trim(), maxTextWidth);
  const verticalPadding = Math.max(16, Math.round(fontSize * 0.6));
  const captionHeight = Math.max(
    Math.round(fontSize * 2.2),
    verticalPadding * 2 + lineHeight * lines.length
  );

  canvas.width = width;
  canvas.height = captionHeight + (image.naturalHeight || image.height);

  // Draw caption background (white)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, captionHeight);

  // Draw text (black, centered)
  ctx.fillStyle = "#111111";
  ctx.font = `${fontSize}px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`;
  const topOffsetPx = 8; // nudge text a few pixels lower
  let y = verticalPadding + topOffsetPx;
  for (const line of lines) {
    const metrics = ctx.measureText(line);
    const x = Math.round((width - metrics.width) / 2);
    ctx.fillText(line, x, y);
    y += lineHeight;
  }

  // Draw original image below caption
  ctx.drawImage(
    image,
    0,
    captionHeight,
    width,
    image.naturalHeight || image.height
  );

  // Export as File
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to export canvas"))),
      "image/png",
      0.92
    );
  });
  const fileName = getFileNameWithSuffix(imageFile.name, "-meme", "png");
  return new File([blob], fileName, { type: "image/png" });
}

export function downloadFile(file: File): void {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
