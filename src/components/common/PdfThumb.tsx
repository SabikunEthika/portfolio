import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { FileText } from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

type PdfThumbProps = {
    file: string;
    title: string;
};

function PdfThumb({ file, title }: PdfThumbProps) {
    const wrapRef = useRef<HTMLSpanElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [state, setState] = useState<"idle" | "ready" | "error">("idle");

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        let cancelled = false;
        let started = false;

        const render = async () => {
            try {
                const task = pdfjsLib.getDocument({ url: file });
                const doc = await task.promise;
                const page = await doc.getPage(1);
                const canvas = canvasRef.current;
                if (!canvas || cancelled) return;

                const base = page.getViewport({ scale: 1 });
                const scale = 360 / base.width;
                const viewport = page.getViewport({ scale });

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const context = canvas.getContext("2d");
                if (!context) return;

                await page.render({ canvas, canvasContext: context, viewport })
                    .promise;

                if (!cancelled) setState("ready");
                task.destroy();
            } catch {
                if (!cancelled) setState("error");
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !started) {
                    started = true;
                    observer.disconnect();
                    render();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(wrap);

        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, [file]);

    return (
        <span ref={wrapRef} className="pdf-thumb">
            <canvas
                ref={canvasRef}
                className={state === "ready" ? "pdf-canvas show" : "pdf-canvas"}
                role="img"
                aria-label={title}
            />

            {state !== "ready" && (
                <span className="cert-pdf">
                    <FileText size={26} />
                    <em>{state === "error" ? "PDF" : "LOADING"}</em>
                </span>
            )}
        </span>
    );
}

export default PdfThumb;