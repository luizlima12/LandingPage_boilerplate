import React from "react";

interface AstronautProps {
  astronautRef: React.RefObject<SVGSVGElement | null>;
}

const AstronautDetailed: React.FC<AstronautProps> = ({ astronautRef }) => {
  return (
    <svg
      ref={astronautRef}
      width="140"
      height="140"
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
      style={{
        left: "30%",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
      }}
    >
      {/* Propulsor / Rastro */}
      <g className="astronaut-thrusters">
        <path
          d="M30 85 L5 90 L10 65 Z"
          fill="#ec4899"
          opacity="0.7"
          className="astronaut-thruster-1"
        />
        <path
          d="M30 95 L0 95 L15 120 Z"
          fill="#8b5cf6"
          opacity="0.7"
          className="astronaut-thruster-2"
        />
        <path
          d="M30 90 L-5 80 L10 95 Z"
          fill="#10b981"
          opacity="0.7"
          className="astronaut-thruster-3"
        />
      </g>

      {/* Tanque de oxigênio */}
      <rect x="52" y="55" width="26" height="40" rx="13" fill="#94A3B8" />
      <rect x="58" y="55" width="14" height="40" rx="7" fill="#64748B" />

      {/* Corpo principal */}
      <rect x="46" y="45" width="38" height="50" rx="19" fill="#E2E8F0" />

      {/* Braços */}
      <g className="astronaut-left-arm">
        <rect
          x="34"
          y="55"
          width="12"
          height="25"
          rx="6"
          fill="#E2E8F0"
          transform="rotate(10 34 55)"
        />
        <circle cx="32" cy="80" r="6" fill="#E2E8F0" />
      </g>

      <g className="astronaut-right-arm">
        <rect
          x="94"
          y="55"
          width="12"
          height="25"
          rx="6"
          fill="#E2E8F0"
          transform="rotate(-10 96 55)"
        />
        <circle cx="98" cy="80" r="6" fill="#E2E8F0" />
      </g>

      {/* Pernas */}
      <rect x="53" y="90" width="12" height="25" rx="6" fill="#E2E8F0" />
      <rect x="65" y="90" width="12" height="25" rx="6" fill="#E2E8F0" />

      {/* Botas */}
      <rect x="50" y="110" width="18" height="10" rx="4" fill="#64748B" />
      <rect x="62" y="110" width="18" height="10" rx="4" fill="#64748B" />

      {/* Capacete */}
      <circle cx="65" cy="35" r="20" fill="#CBD5E1" />
      <circle cx="65" cy="35" r="18" fill="#1E293B" />

      {/* Viseira/Reflexo */}
      <path
        d="M65 23 C73 23, 79 30, 79 38 C79 46, 73 53, 65 53 C57 53, 51 46, 51 38 C51 30, 57 23, 65 23"
        fill="#0F172A"
      />
      <path
        d="M74 28 C76 29, 78 32, 78 35 C78 38, 76 40, 74 41"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.7"
      />

      {/* Detalhes */}
      <circle cx="59" cy="38" r="1.5" fill="#2563EB" />
      <circle cx="71" cy="38" r="1.5" fill="#2563EB" />
      <rect x="54" y="48" width="22" height="3" rx="1.5" fill="#94A3B8" />

      {/* Bandeira na manga */}
      <rect x="39" y="60" width="6" height="4" rx="1" fill="#EF4444" />

      {/* Pequenos controles na cintura */}
      <circle cx="50" cy="75" r="2" fill="#3B82F6" />
      <circle cx="55" cy="75" r="2" fill="#10B981" />
      <circle cx="75" cy="75" r="2" fill="#F59E0B" />
      <circle cx="80" cy="75" r="2" fill="#EC4899" />

      {/* Reflexos do capacete (pequenos pontos de luz) */}
      <circle cx="60" cy="30" r="1.5" fill="white" opacity="0.8" />
      <circle cx="65" cy="25" r="1" fill="white" opacity="0.6" />
      <circle cx="70" cy="28" r="2" fill="white" opacity="0.4" />
    </svg>
  );
};

export default AstronautDetailed;
