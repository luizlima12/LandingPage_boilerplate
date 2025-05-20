import AnimatedCards from "@/components/gsap/animated-cards";
import AnimatedSvgScroll from "@/components/gsap/animatedsvg-scroll";
import HorizontalScrollText from "@/components/gsap/horizontal-scroll-text";
import ScrollAnimations from "@/components/gsap/scroll-animations";
import TimelineAnimation from "@/components/gsap/timeline-animation";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-zinc-100">
      <HorizontalScrollText />
      <ScrollAnimations />
      <AnimatedSvgScroll />
      <TimelineAnimation />
      <AnimatedCards />

      <footer className="text-center p-8 text-gray-600 mt-10 border-t border-gray-200">
        <p>
          © {new Date().getFullYear()} Minha Aplicação - Criado com Next.js,
          TypeScript e Tailwind v4
        </p>
      </footer>
    </div>
  );
};

export default Home;
