"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";

// Registre os plugins apenas no lado do cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

const AnimatedSvgScroll: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !svgRef.current)
      return;
    const importDrawSVG = async () => {
      try {
        if (typeof window !== "undefined") {
          const paths = svgRef.current?.querySelectorAll("path");
          const circles = svgRef.current?.querySelectorAll("circle");

          if (!paths) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          });

          paths.forEach((path, index) => {
            gsap.set(path, {
              strokeDasharray: path.getTotalLength(),
              strokeDashoffset: path.getTotalLength(),
              opacity: 0,
            });
            tl.to(
              path,
              {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power1.inOut",
              },
              index * 0.1
            );
          });
          if (circles) {
            circles.forEach((circle, index) => {
              gsap.set(circle, { scale: 0, opacity: 0 });

              tl.to(
                circle,
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.3,
                  ease: "back.out(1.7)",
                },
                0.5 + index * 0.1
              );
            });
          }

          // Rotação suave do SVG inteiro
          gsap.to(svgRef.current, {
            rotation: 360,
            duration: 40,
            ease: "none",
            repeat: -1,
            transformOrigin: "center center",
          });
        }
      } catch (error) {
        console.error("Error loading DrawSVGPlugin:", error);
      }
    };

    importDrawSVG();

    return () => {
      // Limpar ScrollTriggers ao desmontar
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      id="animated-svg-scroll"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-zinc-900 to-zinc-800 text-center text-white"
    >
      <h2 className="text-3xl font-bold mb-12">Animação SVG com Scroll</h2>

      <div className="flex justify-center items-center">
        <svg
          ref={svgRef}
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform"
        >
          {/* Círculo externo */}
          <circle cx="150" cy="150" r="140" stroke="#6366F1" strokeWidth="3" />

          {/* Círculos decorativos */}
          <circle cx="150" cy="60" r="10" fill="#EC4899" />
          <circle cx="240" cy="150" r="10" fill="#8B5CF6" />
          <circle cx="150" cy="240" r="10" fill="#10B981" />
          <circle cx="60" cy="150" r="10" fill="#F59E0B" />

          {/* Linhas decorativas */}
          <path d="M150 60 L150 240" stroke="#EC4899" strokeWidth="2" />
          <path d="M60 150 L240 150" stroke="#8B5CF6" strokeWidth="2" />

          {/* Padrão geométrico */}
          <path
            d="M150 60 L240 150 L150 240 L60 150 Z"
            stroke="#10B981"
            strokeWidth="2"
          />
          <path
            d="M105 105 L195 105 L195 195 L105 195 Z"
            stroke="#F59E0B"
            strokeWidth="2"
          />

          {/* Padrão espiral */}
          <path
            d="M150 150 C170 130, 190 150, 170 170 C150 190, 130 170, 150 150"
            stroke="#EC4899"
            strokeWidth="2"
          />
          <path
            d="M150 150 C130 130, 110 150, 130 170 C150 190, 170 170, 150 150"
            stroke="#8B5CF6"
            strokeWidth="2"
          />

          {/* Texto circular (pode ser substituído por um elemento <text> real) */}
          <path
            d="M150 80 A70 70 0 0 1 220 150 A70 70 0 0 1 150 220 A70 70 0 0 1 80 150 A70 70 0 0 1 150 80"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
        </svg>
      </div>

      <p className="mt-10 max-w-lg mx-auto text-zinc-300">
        Este SVG é animado gradualmente à medida que você rola a página, criando
        um efeito visual envolvente que destaca sua aplicação.
      </p>
    </div>
  );
};

export default AnimatedSvgScroll;
