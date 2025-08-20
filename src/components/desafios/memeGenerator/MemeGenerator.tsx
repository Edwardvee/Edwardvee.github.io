import React, { useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import "./memeGenerator.scss";
import { createCaption } from "../../../services/api-memes";
import {
  downloadFile,
  renderMemeWithTopCaption,
} from "../../../services/memeRenderer";

export function MemeGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [previewUrl, resultUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected =
      e.target.files && e.target.files[0] ? e.target.files[0] : null;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("pepe");
    if (!file) return;
    setIsGenerating(true);
    try {
      const caption = await createCaption(file);
      const output = await renderMemeWithTopCaption(file, caption);
      // Mostrar resultado en lugar de descargar directamente
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultFile(output);
      const url = URL.createObjectURL(output);
      setResultUrl(url);
      // Scroll suave hacia el resultado
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    } catch (err) {
      console.error("Error generando meme:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (resultFile) downloadFile(resultFile);
  };

  const handleShare = async () => {
    try {
      if (
        resultFile &&
        (navigator as any).canShare &&
        (navigator as any).canShare({ files: [resultFile] })
      ) {
        await (navigator as any).share({
          title: "Meme generado",
          text: "Hecho con Daily Projects",
          files: [resultFile],
        });
        return;
      }
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: "Meme generado",
          text: "Hecho con Daily Projects",
          url: window.location.href,
        });
        return;
      }
      alert(
        "Compartir no está soportado en este navegador. Puedes descargar el meme y compartirlo manualmente."
      );
    } catch (err) {
      console.error("Error al compartir:", err);
    }
  };

  return (
    <div className="meme">
      <header className="meme__header">
        <h2 className="meme__title">Crea tu meme</h2>
        <p className="meme__subtitle">
          Sube una imagen desde tu dispositivo y genera tu meme en segundos.
        </p>
      </header>

      <form
        className="meme-form"
        aria-label="Meme Generator"
        aria-busy={isGenerating}
        onSubmit={handleSubmit}
      >
        <input
          id="meme-image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isGenerating}
          className="meme-form__file"
        />

        <label htmlFor="meme-image" className="meme-uploader" role="button">
          <div className="meme-uploader__icon" aria-hidden>
            <ImagePlus size={28} />
          </div>
          <div className="meme-uploader__text">
            <strong>Haz clic para seleccionar</strong>
            <span>elige una imagen (PNG, JPG, WEBP)</span>
          </div>
        </label>

        {previewUrl && (
          <div className="meme-preview">
            <img
              src={previewUrl}
              alt={file?.name || "Vista previa"}
              className="meme-preview__image"
            />
            {file?.name && (
              <span className="meme-preview__filename">{file.name}</span>
            )}
          </div>
        )}

        <button
          type="submit"
          className="btn btn--primary meme-form__button"
          disabled={!file || isGenerating}
        >
          {isGenerating ? "Generando..." : "Crear meme"}
        </button>

        {isGenerating && (
          <div className="meme-loading" role="status" aria-live="polite">
            <span className="spinner" aria-hidden></span>
            <span className="meme-loading__text">Generando meme...</span>
          </div>
        )}
      </form>

      {resultUrl && (
        <div className="meme-result" ref={resultRef}>
          <h3 className="meme-result__title">Tu meme está listo</h3>
          <img
            src={resultUrl}
            alt="Meme generado"
            className="meme-result__image"
          />
          <div className="meme-result__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleDownload}
            >
              Descargar
            </button>
            <button
              type="button"
              style={{ display: "none" }}
              className="btn btn--secondary"
              onClick={handleShare}
            >
              Compartir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
