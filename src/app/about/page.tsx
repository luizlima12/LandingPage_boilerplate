import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="flex flex-col h-[calc(100vh-150px)] items-center justify-center p-4 ">
      <h1 className="text-3xl font-bold underline">Page About!</h1>
      <p className="text-lg text-center writespace-nowrap">
        This is a simple example of a Landing Page with Next.js.
      </p>
      <p className="text-lg text-center">
        You can start building your app from here.
      </p>
    </div>
  );
}
