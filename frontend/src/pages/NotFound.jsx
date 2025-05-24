import Navbar from "../components/Navbar";

export default function NotFound() {
  return (
    <>
      <head>
        <title>Page Not Found - Toolpresso</title>
      </head>
      <Navbar />
      <div className="text-center p-10 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold  text-blue-600">404</h1>
        <p className="text-6xl font-bold">Page Not Found</p>
      </div>
    </>
  );
}
