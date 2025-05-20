import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  svgRef?: React.Ref<SVGSVGElement>;
  addToPathsRef?: (el: SVGPathElement | null, index: number) => void;
}

export default function SvgHorizontal({
  stroke = "#EC4899",
  svgRef,
  addToPathsRef,
}: Props) {
  // Store refs to each path in an array for potential future use (e.g., animations)

  return (
    <svg
      ref={svgRef}
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-20"
      style={{ transformOrigin: "center center" }}
    >
      {/* Círculo externo */}
      <path
        ref={(el) => addToPathsRef && addToPathsRef(el, 0)}
        d="M250 50 A200 200 0 0 1 450 250 A200 200 0 0 1 250 450 A200 200 0 0 1 50 250 A200 200 0 0 1 250 50 Z"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
      />

      {/* Padrão geométrico - Estrela */}
      <path
        ref={(el) => addToPathsRef && addToPathsRef(el, 1)}
        d="M250 100 L300 200 L410 210 L330 290 L350 400 L250 350 L150 400 L170 290 L90 210 L200 200 Z"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
      />

      {/* Hexágono */}
      <path
        ref={(el) => addToPathsRef && addToPathsRef(el, 2)}
        d="M250 150 L350 192 L350 308 L250 350 L150 308 L150 192 Z"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
      />

      {/* Espiral */}
      <path
        ref={(el) => addToPathsRef && addToPathsRef(el, 3)}
        d="M250 250 
          C270 230, 290 230, 310 250 
          C330 270, 330 290, 310 310 
          C290 330, 270 330, 250 310 
          C230 290, 230 270, 250 250"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
      />

      {/* Linhas cruzadas */}
      <path
        ref={(el) => addToPathsRef && addToPathsRef(el, 4)}
        d="M150 150 L350 350 M350 150 L150 350"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
      />

      {/* Forma ondulada */}
      <path
        ref={(el) => addToPathsRef && addToPathsRef(el, 5)}
        d="M100 250 C150 200, 200 300, 250 250 C300 200, 350 300, 400 250"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
      />

      {/* Círculos concêntricos */}
      <path
        ref={(el) => addToPathsRef && addToPathsRef(el, 6)}
        d="M250 190 A60 60 0 0 1 310 250 A60 60 0 0 1 250 310 A60 60 0 0 1 190 250 A60 60 0 0 1 250 190 Z"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
      />

      <path
        ref={(el) => addToPathsRef && addToPathsRef(el, 7)}
        d="M250 220 A30 30 0 0 1 280 250 A30 30 0 0 1 250 280 A30 30 0 0 1 220 250 A30 30 0 0 1 250 220 Z"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
