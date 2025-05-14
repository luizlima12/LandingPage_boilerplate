import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Landing Page",
};

export default function Home() {
  return (
    <div className="flex flex-col h-[calc(100vh-150px)] items-center justify-center p-4 ">
      <h1 className="text-3xl font-bold underline">Page Home!</h1>
      <p className="text-lg">
        This is a simple example of a Landing Page with Next.js.
      </p>
      <p className="text-lg">You can start building your app from here.</p>
    </div>
  );
}
