import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-screen w-full flex flex-col">
      <header className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-bold">AdaptiveLearn</h1>

        <nav className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 inline-flex items-center justify-center"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 inline-flex items-center justify-center"
          >
            Register
          </Link>
        </nav>
      </header>

      <div className="flex flex-1">
        <div className="flex flex-col justify-center px-16 w-full md:w-1/2">
          <h1 className="text-5xl font-bold leading-tight">
            Learn Smarter with <br />
            Adaptive Learning
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Our platform adapts to your learning style, helping you master
            concepts faster with personalized paths, real-time feedback, and
            AI-driven recommendations.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/register"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 inline-flex items-center justify-center"
            >
              Get Started
            </Link>
            <button
              type="button"
              className="border px-6 py-3 rounded-lg hover:bg-gray-100"
            >
              Learn More
            </button>
          </div>
        </div>

        <div
          className="hidden md:flex w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501504905252-473c47e087f8')",
          }}
        />
      </div>
    </div>
  );
}
