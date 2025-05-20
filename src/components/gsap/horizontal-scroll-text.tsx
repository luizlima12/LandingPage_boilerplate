"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Registre o plugin apenas no lado do cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalScrollText: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !sectionRef.current ||
      !textRef.current
    )
      return;

    // Configurando a animação horizontal
    gsap.to(textRef.current, {
      xPercent: -100, // Move o texto 100% para a esquerda
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", // A duração do efeito de scroll
        pin: true, // Fixa a seção durante o scroll
        scrub: 1, // Suaviza a animação durante o scroll
        anticipatePin: 1, // Reduz o "salto" que às vezes ocorre com pinning
      },
    });

    // Adicionar um efeito parallax nos elementos de fundo
    const bgElements = document.querySelectorAll(".bg-element");
    bgElements.forEach((element, i) => {
      const speed = 1 + i * 0.1;

      gsap.to(element, {
        xPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
        },
      });
    });

    return () => {
      // Limpar ScrollTriggers ao desmontar
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen overflow-hidden bg-zinc-900 text-white relative"
    >
      {/* Elementos de fundo para efeito parallax */}
      <div className="bg-element absolute top-[20%] left-[10%] w-16 h-16 rounded-full bg-purple-500/30 blur-md"></div>
      <div className="bg-element absolute top-[60%] left-[30%] w-24 h-24 rounded-full bg-blue-500/30 blur-md"></div>
      <div className="bg-element absolute top-[40%] left-[50%] w-20 h-20 rounded-full bg-pink-500/30 blur-lg"></div>
      <div className="bg-element absolute top-[70%] left-[70%] w-32 h-32 rounded-full bg-emerald-500/30 blur-md"></div>

      {/* Texto que se move horizontalmente */}
      <div className="flex items-center h-screen">
        <div
          ref={textRef}
          className="text-[8vw] font-bold whitespace-nowrap pl-[10vw]"
        >
          Crie experiências digitais impressionantes • Desenvolva interfaces
          inovadoras • Destaque-se com animações únicas •
        </div>
      </div>

      {/* Instruções de scroll */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 flex items-center gap-2 text-sm">
        <span>Role para baixo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
};

export default HorizontalScrollText;
