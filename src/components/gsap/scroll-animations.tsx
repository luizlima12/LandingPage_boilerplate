"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Certifique-se de registrar o plugin apenas no lado do cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollAnimations: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const parallaxSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Certificar-se de que o código executa apenas no cliente
    if (typeof window === "undefined") return;

    // Animar elementos quando entrarem na viewport
    sectionsRef.current.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Efeito parallax
    if (parallaxRef.current && parallaxSectionRef.current) {
      gsap.to(parallaxRef.current, {
        y: 300,
        ease: "none",
        scrollTrigger: {
          trigger: parallaxSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Limpeza ao desmontar o componente
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {["Seção 1", "Seção 2", "Seção 3"].map((section, index) => (
        <div
          id="section"
          key={index}
          ref={(el) => {
            if (el) sectionsRef.current[index] = el;
          }}
          className="max-w-3xl mx-auto p-5 my-10 bg-white rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold">{section}</h2>
          <p className="my-4">
            Esta seção será animada quando entrar na viewport.
          </p>
        </div>
      ))}

      <div
        id="parallax-section"
        ref={parallaxSectionRef}
        className="relative h-[400px] overflow-hidden"
      >
        <div
          ref={parallaxRef}
          className="absolute w-full h-[150%] bg-gradient-to-br from-blue-500 to-purple-600 top-[-25%]"
        />
        <div className="relative z-10 text-center pt-[150px] text-white">
          <h2 className="text-3xl font-bold">Efeito Parallax</h2>
          <p className="mt-2">Rolagem suave para criar profundidade</p>
        </div>
      </div>
    </>
  );
};

export default ScrollAnimations;
