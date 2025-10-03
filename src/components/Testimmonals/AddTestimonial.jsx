// src/components/ReviewSection.jsx
import { useState, useMemo, useEffect } from 'react';
import { FaStar, FaPlus } from 'react-icons/fa';

const API_URL =
  'https://68dba088445fdb39dc2609a7.mockapi.io/api/v1/ClientReviews/reviews';

export default function ReviewSection() {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [form, setForm] = useState({
    name: '',
    position: '',
    testimonialText: '',
    rating: 5,
    profileImage: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  /* load reviews from MockAPI */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // normalize API data
        const normalized = data.map((item) => ({
          id: item.id,
          name: item.name,
          position: item.position || 'User',
          testimonialText: item.testimonialText || item.review || '',
          rating: Math.min(5, Math.round((item.rating || 5) / 20)), // convert 0-100 → 1-5
          profileImage: item.profileImage || item.avatar || '',
          createdAt: item.createdAt,
        }));
        setReviews(normalized);
      })
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);

  /* sort by rating */
  const sortedReviews = useMemo(
    () => [...reviews].sort((a, b) => b.rating - a.rating),
    [reviews]
  );

  /* pagination logic */
  const totalPages = Math.ceil(sortedReviews.length / perPage);
  const currentReviews = sortedReviews.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const selectRating = (r) => setForm((prev) => ({ ...prev, rating: r }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      name: form.name,
      position: form.position,
      testimonialText: form.testimonialText,
      review: form.testimonialText, // also map to API "review"
      rating: form.rating * 20, // store as 0-100 in API
      profileImage:
        form.profileImage ||
        `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70 + 1)}`,
      avatar: form.profileImage, // for compatibility with API
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      const saved = await res.json();

      setReviews((prev) => [
        {
          ...saved,
          testimonialText: saved.testimonialText || saved.review,
          rating: Math.min(5, Math.round((saved.rating || 5) / 20)),
          profileImage: saved.profileImage || saved.avatar,
        },
        ...prev,
      ]);

      setForm({
        name: '',
        position: '',
        testimonialText: '',
        rating: 5,
        profileImage: '',
      });
      setOpen(false);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error saving review:', err);
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-sky-50 to-slate-100 py-20" id="testimonials">
      {/* heading + CTA */}
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#002244] via-sky-500 to-sky-300 bg-clip-text text-transparent">
          Community Feedback
        </h2>
        <p className="mx-auto mt-4 max-w-md text-gray-600 sm:text-lg">
          Real experiences shared by our users.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 active:scale-95"
        >
          <FaPlus className="text-xs" />
          Add Feedback
        </button>
      </div>

      {/* reviews grid */}
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentReviews.map((r) => (
          <article
            key={r.id}
            className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl border border-gray-100"
          >
            <header className="flex items-center gap-4">
              <img
                src={r.profileImage}
                alt={r.name}
                className="h-16 w-16 rounded-full border-2 border-sky-400 object-cover shadow"
              />
              <div>
                <h4 className="text-lg font-semibold text-slate-800">
                  {r.name}
                </h4>
                <p className="text-sm text-gray-500">{r.position}</p>
              </div>
            </header>

            <p className="mt-4 text-gray-600 italic leading-relaxed">
              “{r.testimonialText}”
            </p>

            <footer className="mt-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-5 w-5 ${
                    i < r.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </footer>
          </article>
        ))}
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-md bg-gray-200 px-3 py-1 text-sm disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`rounded-md px-3 py-1 text-sm ${
                currentPage === i + 1
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-md bg-gray-200 px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* modal */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[1100] bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-0 z-[1110] flex items-center justify-center p-4">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-3xl space-y-6 rounded-xl bg-white p-6 shadow-2xl sm:p-8"
            >
              <h3 className="text-center text-2xl font-bold text-slate-800">
                Share Your Feedback
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-sky-300 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Position / Title
                  </label>
                  <input
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-sky-300 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Your Feedback
                  </label>
                  <textarea
                    name="testimonialText"
                    value={form.testimonialText}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="block w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-sky-300 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        onClick={() => selectRating(i + 1)}
                        className={`h-6 w-6 cursor-pointer ${
                          i < form.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Profile Image URL
                  </label>
                  <input
                    name="profileImage"
                    value={form.profileImage}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-sky-300 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 active:scale-95"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
}
