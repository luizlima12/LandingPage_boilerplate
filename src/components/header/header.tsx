import Image from "next/image";
import Logo from "../../../public/next.svg";
import NavBar from "./nav-bar";
export default function Cabecalho() {
  return (
    <header
      className="z-50 w-full fixed flex items-center justify-between 
                md:justify-center gap-20 p-5 bg-primary/70 backdrop-blur-3xl text-white"
    >
      <Image
        src={Logo}
        alt="Logo"
        width={100}
        height={100}
        className="h-8 w-auto shadow-xl"
      />
      <NavBar />
    </header>
  );
}
