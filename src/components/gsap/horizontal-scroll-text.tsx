"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SvgHorizontal from "../svg/svg1";
import Astronaut from "../svg/astronaut";

// Registre o plugin apenas no lado do cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalScrollText: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const svgGroupRef = useRef<SVGGElement>(null);
  const astronautRef = useRef<SVGSVGElement>(null);
  const pingCirclesRef = useRef<SVGCircleElement[]>([]);
  const rippleCirclesRef = useRef<SVGCircleElement[]>([]);

  // Estado para acompanhar a posição atual do scroll
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Palavras-chave para acionar diferentes animações do SVG
  const keywords = useMemo(() => ["digitais", "interfaces", "animações"], []);
  const keywordRefs = useRef<HTMLSpanElement[]>([]);
  const pathsRef = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    // Timeline principal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Atualizar a posição do scroll para uso nos efeitos
          setScrollPosition(self.progress);

          // A cada ~10% do scroll, ativar uma animação de "pingo"
          if (Math.floor(self.progress * 100) % 10 === 0) {
            const circleIndex = Math.floor(self.progress * 10) % 5;

            if (pingCirclesRef.current && pingCirclesRef.current[circleIndex]) {
              const circle = pingCirclesRef.current[circleIndex];

              // Posição baseada no progresso do scroll
              const x = window.innerWidth * (0.2 + self.progress * 0.6);
              const y = window.innerHeight * 0.5;

              // Animação de "pingo" simples
              gsap.killTweensOf(circle);
              gsap.set(circle, {
                cx: x,
                cy: y,
                r: 10,
                opacity: 1,
                fill:
                  self.progress < 0.33
                    ? "#ec4899"
                    : self.progress < 0.66
                    ? "#8b5cf6"
                    : "#10b981",
              });

              gsap.to(circle, {
                r: 40,
                opacity: 0,
                duration: 1,
                ease: "power1.out",
              });
            }
          }

          // A cada ~15% do scroll, ativar uma animação de "ondulação"
          if (Math.floor(self.progress * 100) % 15 === 0) {
            const rippleIndex = Math.floor((self.progress * 100) / 15) % 5;

            if (
              rippleCirclesRef.current &&
              rippleCirclesRef.current[rippleIndex]
            ) {
              const ripple = rippleCirclesRef.current[rippleIndex];

              // Posição aleatória na tela
              const x = window.innerWidth * (0.3 + Math.random() * 0.4);
              const y = window.innerHeight * (0.3 + Math.random() * 0.4);

              // Animação de "ondulação"
              gsap.killTweensOf(ripple);
              gsap.set(ripple, {
                cx: x,
                cy: y,
                r: 5,
                opacity: 0.8,
                stroke: self.progress < 0.5 ? "#8b5cf6" : "#10b981",
                strokeWidth: 2,
                fill: "transparent",
              });

              gsap.to(ripple, {
                r: 80,
                opacity: 0,
                strokeWidth: 0.5,
                duration: 1.5,
                ease: "power1.out",
              });
            }
          }
        },
      },
    });

    // Animação dos caminhos SVG
    pathsRef.current.forEach((path, i) => {
      const startColor = i % 2 === 0 ? "#ec4899" : "#8b5cf6";
      const endColor = i % 2 === 0 ? "#8b5cf6" : "#ec4899";

      // Definição inicial
      gsap.set(path, {
        stroke: startColor,
        strokeDasharray: path.getTotalLength(),
        strokeDashoffset: path.getTotalLength(),
      });

      // Animação de desenho do traço
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          stroke: endColor,
          duration: 0.5,
          ease: "power1.inOut",
        },
        i * 0.05
      );
    });

    // Animação do SVG principal
    tl.to(
      svgRef.current,
      {
        rotation: 360,
        scale: 1.2,
        ease: "none",
      },
      0
    );

    // Adicionar um efeito parallax nos elementos de fundo
    const bgElements = document.querySelectorAll(".bg-element");
    bgElements.forEach((element, i) => {
      const speed = 1 + i * 0.1;

      tl.to(
        element,
        {
          xPercent: -50 * speed,
          ease: "none",
        },
        0
      );
    });

    // Animação do texto horizontal
    tl.to(
      textRef.current,
      {
        xPercent: -100,
        ease: "none",
      },
      0
    );

    // Rotação contínua do SVG
    tl.to(
      svgGroupRef.current,
      {
        rotation: 360,
        ease: "none",
        transformOrigin: "center center",
      },
      0
    );

    // NOVA ANIMAÇÃO: Astronauta flutuando
    if (astronautRef.current) {
      // Configurar posição inicial fora da tela
      gsap.set(astronautRef.current, {
        x: -120, // Fora da tela à esquerda
        y: window.innerHeight * 0.1, // Um pouco acima do centro
        rotation: -10, // Ligeiramente inclinado
      });

      // Movimento principal do astronauta
      tl.to(
        astronautRef.current,
        {
          motionPath: {
            path: [
              { x: window.innerWidth * 0.2, y: window.innerHeight * 0.2 },
              { x: window.innerWidth * 0.4, y: window.innerHeight * 0.4 },
              { x: window.innerWidth * 0.7, y: window.innerHeight * 0.2 },
              { x: window.innerWidth * 0.9, y: window.innerHeight * 0.5 },
              { x: window.innerWidth + 120, y: window.innerHeight * 0.3 }, // Sai pela direita
            ],
            curviness: 1.5,
          },
          rotation: 15,
          ease: "power1.inOut",
        },
        0
      );

      // Animações secundárias (flutuação constante)
      gsap.to(astronautRef.current, {
        y: "+=15",
        rotation: "+=5",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animação dos propulsores
      gsap.to(
        ".astronaut-thruster-1, .astronaut-thruster-2, .astronaut-thruster-3",
        {
          opacity: 0.4,
          scale: 0.8,
          duration: 0.3,
          repeat: -1,
          yoyo: true,
          stagger: 0.1,
          ease: "sine.inOut",
        }
      );
    }

    // Animações especiais para palavras-chave
    keywords.forEach((keyword, i) => {
      const keywordElement = keywordRefs.current[i];
      if (!keywordElement) return;

      ScrollTrigger.create({
        trigger: keywordElement,
        start: "center 60%",
        end: "center 40%",
        scrub: true,
        onEnter: () => {
          // Animações diferentes para cada palavra-chave
          switch (i) {
            case 0: // "digitais"
              gsap.to(keywordElement, {
                scale: 1.2,
                color: "#ec4899",
                duration: 0.5,
                overwrite: "auto",
              });
              // Fazer o astronauta reagir à palavra-chave (rotação mais rápida)
              if (astronautRef.current) {
                gsap.to(astronautRef.current, {
                  rotation: "+=20",
                  duration: 1,
                  ease: "elastic.out(1.2, 0.5)",
                });
              }
              break;
            case 1: // "interfaces"
              gsap.to(keywordElement, {
                scale: 1.1,
                color: "#8b5cf6",
                duration: 0.5,
                overwrite: "auto",
              });
              // Astronauta faz um loop
              if (astronautRef.current) {
                gsap.to(astronautRef.current, {
                  rotation: "+=360",
                  duration: 1.5,
                  ease: "power2.inOut",
                });
              }
              break;
            case 2: // "animações"
              gsap.to(keywordElement, {
                scale: 1.2,
                color: "#10b981",
                duration: 0.5,
                overwrite: "auto",
              });
              // Astronauta pulsa
              if (astronautRef.current) {
                gsap.to(astronautRef.current, {
                  scale: 1.3,
                  duration: 0.5,
                  yoyo: true,
                  repeat: 1,
                  ease: "power2.inOut",
                });
              }
              break;
          }

          // Ativar uma "ondulação" ao redor da palavra-chave
          if (rippleCirclesRef.current && rippleCirclesRef.current[i + 5]) {
            const ripple = rippleCirclesRef.current[i + 5];
            const rect = keywordElement.getBoundingClientRect();
            const sectionRect = sectionRef.current!.getBoundingClientRect();

            // Posicionar sobre a palavra-chave
            const x = rect.left - sectionRect.left + rect.width / 2;
            const y = rect.top - sectionRect.top + rect.height / 2;

            gsap.killTweensOf(ripple);
            gsap.set(ripple, {
              cx: x,
              cy: y,
              r: 10,
              opacity: 0.8,
              stroke: i === 0 ? "#ec4899" : i === 1 ? "#8b5cf6" : "#10b981",
              strokeWidth: 2,
              fill: "transparent",
            });

            gsap.to(ripple, {
              r: 60,
              opacity: 0,
              strokeWidth: 0.5,
              duration: 1.5,
              ease: "power1.out",
            });
          }
        },
        onLeave: () => {
          // Reverter para o estado normal
          gsap.to(keywordElement, {
            scale: 1,
            color: "white",
            duration: 0.5,
            overwrite: "auto",
          });
        },
        onEnterBack: () => {
          // Repetir a animação quando voltar
          gsap.to(keywordElement, {
            scale: 1.1,
            color: i === 0 ? "#ec4899" : i === 1 ? "#8b5cf6" : "#10b981",
            duration: 0.5,
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          // Reverter para o estado normal ao voltar
          gsap.to(keywordElement, {
            scale: 1,
            color: "white",
            duration: 0.5,
            overwrite: "auto",
          });
        },
      });
    });

    return () => {
      // Limpar ScrollTriggers ao desmontar
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [keywords]);

  // Funções auxiliares para adicionar elementos aos refs arrays
  const addToKeywordRefs = (el: HTMLSpanElement | null, index: number) => {
    if (el) keywordRefs.current[index] = el;
  };

  const addToPingCirclesRef = (el: SVGCircleElement | null, index: number) => {
    if (el) pingCirclesRef.current[index] = el;
  };

  const addToRippleCirclesRef = (
    el: SVGCircleElement | null,
    index: number
  ) => {
    if (el) rippleCirclesRef.current[index] = el;
  };

  const addToPathsRef = (el: SVGPathElement | null, index: number) => {
    if (el) {
      pathsRef.current[index] = el;
    }
  };

  // Preparando o texto com palavras-chave destacadas
  const textParts = [
    "Crie experiências ",
    "digitais",
    " impressionantes • Desenvolva ",
    "interfaces",
    " inovadoras • Destaque-se com ",
    "animações",
    " únicas •",
  ];

  // Função para iniciar o drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!astronautRef.current) return;
    setIsDragging(true);
    const rect = astronautRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    // Pausa as animações do astronauta
    gsap.killTweensOf(astronautRef.current);
  };

  // Função para mover o astronauta
  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!astronautRef.current) return;
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      gsap.set(astronautRef.current, { x, y });
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen overflow-hidden bg-zinc-900 text-white relative"
    >
      {/* Elementos de fundo */}
      <div className="bg-element absolute top-[20%] left-[10%] w-16 h-16 rounded-full bg-purple-500/30 blur-md"></div>
      <div className="bg-element absolute top-[60%] left-[30%] w-24 h-24 rounded-full bg-blue-500/30 blur-md"></div>
      <div className="bg-element absolute top-[40%] left-[50%] w-20 h-20 rounded-full bg-pink-500/30 blur-lg"></div>
      <div className="bg-element absolute top-[70%] left-[70%] w-32 h-32 rounded-full bg-emerald-500/30 blur-md"></div>

      {/* Container principal */}
      <div ref={containerRef} className="flex items-center h-screen">
        {/* SVG interativo */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-7xl flex justify-center items-center pointer-events-none">
          <SvgHorizontal svgRef={svgRef} addToPathsRef={addToPathsRef} />
        </div>

        {/* Astronauta */}
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 50,
            zIndex: 20,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
        >
          <Astronaut astronautRef={astronautRef} />
        </div>

        {/* SVG para os "pingos" preenchidos */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          aria-hidden="true"
        >
          {/* 5 círculos pré-criados para animação de "pingo" */}
          {[...Array(5)].map((_, index) => (
            <circle
              key={`ping-${index}`}
              ref={(el) => addToPingCirclesRef(el, index)}
              cx="-100" // Fora da tela inicialmente
              cy="-100"
              r="5"
              opacity="0"
              fill="#ec4899"
            />
          ))}
        </svg>

        {/* SVG para os "pingos" estilo "ripple" (ondulação) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          aria-hidden="true"
        >
          {/* 10 círculos pré-criados para animação de "ondulação" */}
          {[...Array(10)].map((_, index) => (
            <circle
              key={`ripple-${index}`}
              ref={(el) => addToRippleCirclesRef(el, index)}
              cx="-100" // Fora da tela inicialmente
              cy="-100"
              r="5"
              opacity="0"
              stroke="#8b5cf6"
              strokeWidth="2"
              fill="transparent"
            />
          ))}
        </svg>

        {/* Texto com palavras-chave destacadas */}
        <div
          ref={textRef}
          className="text-[8vw] font-bold whitespace-nowrap pl-[10vw] z-10"
          style={{ textShadow: "0 0 10px rgba(0,0,0,0.3)" }}
        >
          {textParts.map((part, index) => {
            // Verificar se esta parte é uma palavra-chave
            const isKeyword = keywords.includes(part);

            return isKeyword ? (
              <span
                key={index}
                ref={(el) => addToKeywordRefs(el, keywords.indexOf(part))}
                className="relative inline-block origin-center transition-all duration-300"
              >
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            );
          })}
        </div>
      </div>

      {/* Instruções e informações */}
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

      {/* Indicador de progresso do scroll */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-white/20 rounded-full">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
          style={{ width: `${scrollPosition * 100}%` }}
        ></div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-center max-w-md text-sm">
        <p>
          Observe os efeitos durante a rolagem: pingos sólidos, ondulações e o
          astronauta flutuando pelo espaço!
        </p>
        <p className="mt-2 text-xs text-white/50">
          Desenvolvido por {process.env.NEXT_PUBLIC_USER_LOGIN || "luizlima12"}{" "}
          • {new Date("2025-05-20").toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default HorizontalScrollText;
