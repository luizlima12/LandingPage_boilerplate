"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CardProps {
  title: string;
  description: string;
  icon?: string;
}

const AnimatedCards: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const cards: CardProps[] = [
    {
      title: "Serviço 1",
      description: "Descrição do serviço 1 com detalhes interessantes.",
      icon: "✨",
    },
    {
      title: "Serviço 2",
      description: "Descrição do serviço 2 com detalhes interessantes.",
      icon: "🚀",
    },
    {
      title: "Serviço 3",
      description: "Descrição do serviço 3 com detalhes interessantes.",
      icon: "💡",
    },
  ];

  useEffect(() => {
    // Animação dos cartões
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power1.out",
      scrollTrigger: {
        trigger: cardsRef.current[0],
        start: "top 80%",
      },
    });

    // Hover effect com GSAP
    cardsRef.current.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          duration: 0.3,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          duration: 0.3,
        });
      });
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-5 my-10">
      <h2 className="text-2xl font-bold mb-8 text-center">Nossos Serviços</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="bg-white p-6 rounded-xl shadow-md transition-shadow"
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCards;
