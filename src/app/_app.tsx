// import { useEffect } from "react";
// import type { AppProps } from "next/app";
// import "./globals.css";

// function MyApp({ Component, pageProps }: AppProps) {
//   useEffect(() => {
//     // Código para garantir que o GSAP seja inicializado apenas no cliente
//     if (typeof window !== "undefined") {
//       // Importação dinâmica do GSAP (opcional, se estiver tendo problemas com SSR)
//       const loadGSAP = async () => {
//         const gsapModule = await import("gsap");
//         const ScrollTriggerModule = await import("gsap/dist/ScrollTrigger");

//         gsapModule.gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);
//       };

//       loadGSAP();
//     }
//   }, []);

//   return <Component {...pageProps} />;
// }

// export default MyApp;
