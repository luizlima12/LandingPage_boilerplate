"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const TimelineAnimation: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Criando uma timeline
    const tl = gsap.timeline();

    // Adicionando animações à timeline
    tl.from(logoRef.current, { opacity: 0, scale: 0.5, duration: 0.8 })
      .from(headlineRef.current, { opacity: 0, y: 50, duration: 0.5 }, "-=0.3")
      .from(
        subheadingRef.current,
        { opacity: 0, y: 30, duration: 0.5 },
        "-=0.1"
      )
      .from(ctaRef.current, { opacity: 0, scale: 0.8, duration: 0.5 });

    // Store the button ref in a variable
    const startButton = startButtonRef.current;

    // Define the handler separately so it can be removed
    const handleRestart = () => {
      tl.restart();
    };

    // Iniciar a timeline quando o botão for clicado
    if (startButton) {
      startButton.addEventListener("click", handleRestart);
    }

    // Limpeza ao desmontar
    return () => {
      if (startButton) {
        startButton.removeEventListener("click", handleRestart);
      }
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 my-10 bg-white rounded-lg shadow-lg text-center">
      {/*  */}
      <h2 ref={headlineRef} className="text-3xl font-bold mb-4">
        Título Animado
      </h2>
      <p ref={subheadingRef} className="text-lg text-gray-600 mb-8">
        Esta é uma demonstração de timeline do GSAP no Next.js
      </p>
      <button
        ref={ctaRef}
        className="bg-indigo-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors"
      >
        Saiba Mais
      </button>
      <button
        ref={startButtonRef}
        className="mt-8 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
      >
        Reiniciar Animação
      </button>
    </div>
  );
};

export default TimelineAnimation;
