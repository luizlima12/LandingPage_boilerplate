import Image from "next/image";
import Logo from "../../../public/next.svg";
export default function Cabecalho() {
  return (
    <header className="flex items-center justify-between p-8 bg-primary/30 text-white">
      <Image
        src={Logo}
        alt="Logo"
        width={100}
        height={100}
        className="h-8 w-auto shadow-xl"
      />
    </header>
  );
}
