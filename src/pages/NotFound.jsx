import React from 'react';
import { Link } from 'react-router-dom';

// Google‑font link once in public/index.html <head>
// <link href="https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap" rel="stylesheet" />
export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-white py-10 font-arvo">
      <div className="mx-auto max-w-4xl px-4">
        {/* big 404 + GIF bg */}
        <div
          className="relative flex h-72 items-center justify-center rounded-lg bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
        >
          <h1 className="text-[80px] font-bold bg-gradient-to-r from-[#002244] via-sky-500 to-sky-300 bg-clip-text text-transparent drop-shadow-lg">
            404
          </h1>
        </div>

        {/* content */}
        <div className="-mt-12 text-center">
          <h2 className="mb-4 text-2xl font-bold">Looks like you&apos;re lost</h2>
          <p className="mb-6 text-gray-600">
            The page you are looking for isn&apos;t available!
          </p>

          <Link
            to="/"
            className="inline-block rounded-md bg-gradient-to-r from-sky-600 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-green-700 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
