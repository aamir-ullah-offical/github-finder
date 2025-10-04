// src/components/profile/FindAndFilter.jsx
import { useState } from "react";
import {
  FaSearch,
  FaArrowRight,
  FaFilter,
  FaGithub,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import GitHubProfileModal from "./GitHubProfileModal";

const FILTER_FIELDS = [
  { label: "By Username", key: "username", type: "user" },
  { label: "By Display Name", key: "name", type: "user" },
  { label: "By Repo", key: "repo", type: "repo" },
  { label: "By Language", key: "language", type: "repo" },
  { label: "By Location", key: "location", type: "user" },
];

const ITEMS_PER_PAGE = 8;

export default function FindAndFilter() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [activeUsername, setActiveUsername] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState(new Set(["username", "name"]));
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilter = (key) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const computeMatchPercent = (item) => {
    const selCount = selected.size || 1;
    const matchedCount = item.matchedBy?.length || 0;
    return Math.round((matchedCount / selCount) * 100);
  };

  const handleSearch = async () => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    setResults([]);
    setCurrentPage(1);

    try {
      const sel = Array.from(selected);
      const userFilters = sel.filter((k) =>
        FILTER_FIELDS.find((f) => f.key === k && f.type === "user")
      );
      const repoFilters = sel.filter((k) =>
        FILTER_FIELDS.find((f) => f.key === k && f.type === "repo")
      );

      const fetched = [];

      // USERS SEARCH
      if (userFilters.length > 0) {
        const inParts = [];
        const qualifiers = [];
        if (userFilters.includes("username")) inParts.push("login");
        if (userFilters.includes("name")) inParts.push("name");
        if (userFilters.includes("bio")) inParts.push("bio");
        if (userFilters.includes("location")) qualifiers.push(`location:${q}`);
        if (userFilters.includes("company")) qualifiers.push(`company:${q}`);

        let userQ = encodeURIComponent(q);
        if (inParts.length > 0)
          userQ = encodeURIComponent(`${q} in:${inParts.join(",")}`);
        if (qualifiers.length > 0)
          userQ += "+" + qualifiers.map((s) => encodeURIComponent(s)).join("+");

        const usersUrl = `https://api.github.com/search/users?q=${userQ}&per_page=50`;
        const res = await fetch(usersUrl);
        const data = await res.json();
        if (data?.items?.length) {
          fetched.push(
            ...data.items.map((u) => ({
              type: "user",
              id: u.id,
              login: u.login,
              avatar_url: u.avatar_url,
              html_url: u.html_url,
              matchedBy: userFilters.map(
                (k) => FILTER_FIELDS.find((f) => f.key === k)?.label || k
              ),
              raw: u,
            }))
          );
        }
      }

      // REPOS SEARCH
      if (repoFilters.length > 0) {
        const inParts = [];
        const qualifiers = [];
        if (repoFilters.includes("repo")) inParts.push("name");
        if (repoFilters.includes("description")) inParts.push("description");
        if (repoFilters.includes("language")) qualifiers.push(`language:${q}`);

        let repoQ = encodeURIComponent(q);
        if (inParts.length > 0)
          repoQ = encodeURIComponent(`${q} in:${inParts.join(",")}`);
        if (qualifiers.length > 0)
          repoQ +=
            "+" + qualifiers.map((s) => encodeURIComponent(s)).join("+");

        const reposUrl = `https://api.github.com/search/repositories?q=${repoQ}&per_page=50`;
        const resR = await fetch(reposUrl);
        const dataR = await resR.json();
        if (dataR?.items?.length) {
          fetched.push(
            ...dataR.items.map((r) => ({
              type: "repo",
              id: r.id,
              full_name: r.full_name,
              name: r.name,
              owner: r.owner,
              avatar_url: r.owner?.avatar_url,
              html_url: r.html_url,
              description: r.description,
              language: r.language,
              stargazers_count: r.stargazers_count,
              matchedBy: repoFilters.map(
                (k) => FILTER_FIELDS.find((f) => f.key === k)?.label || k
              ),
              raw: r,
            }))
          );
        }
      }

      // fallback combined search
      if (userFilters.length === 0 && repoFilters.length === 0) {
        const usersUrl = `https://api.github.com/search/users?q=${encodeURIComponent(
          `${q} in:login,in:name,in:bio`
        )}&per_page=40`;
        const [resU, resR] = await Promise.all([
          fetch(usersUrl),
          fetch(
            `https://api.github.com/search/repositories?q=${encodeURIComponent(
              `${q} in:name,in:description`
            )}&per_page=40`
          ),
        ]);
        const dataU = await resU.json();
        const dataR = await resR.json();
        if (dataU?.items) {
          fetched.push(
            ...dataU.items.map((u) => ({
              type: "user",
              id: u.id,
              login: u.login,
              avatar_url: u.avatar_url,
              html_url: u.html_url,
              matchedBy: ["All fields"],
              raw: u,
            }))
          );
        }
        if (dataR?.items) {
          fetched.push(
            ...dataR.items.map((r) => ({
              type: "repo",
              id: r.id,
              full_name: r.full_name,
              name: r.name,
              owner: r.owner,
              avatar_url: r.owner?.avatar_url,
              html_url: r.html_url,
              description: r.description,
              language: r.language,
              stargazers_count: r.stargazers_count,
              matchedBy: ["All fields"],
              raw: r,
            }))
          );
        }
      }

      // dedupe
      const map = new Map();
      for (const it of fetched) {
        const key = `${it.type}-${it.id}`;
        if (!map.has(key)) map.set(key, it);
        else {
          const prev = map.get(key);
          prev.matchedBy = Array.from(
            new Set([...(prev.matchedBy || []), ...(it.matchedBy || [])])
          );
          map.set(key, prev);
        }
      }

      const merged = Array.from(map.values());
      merged.sort((a, b) =>
        a.type === b.type ? 0 : a.type === "user" ? -1 : 1
      );
      setResults(merged);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE) || 1;
  const paginated = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const parentVars = { show: { transition: { staggerChildren: 0.05 } } };
  const cardVars = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <>
      <section className="bg-white py-16" id="githubFinder">
        <div className="container mx-auto px-4">
          <h2
            className="mb-10 text-center text-4xl sm:text-5xl font-extrabold tracking-tight
              bg-gradient-to-r from-[#002244] via-sky-500 to-sky-300
              bg-clip-text text-transparent flex items-center justify-center gap-3"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            <FaGithub className="text-5xl" />
            GitHub Finder
          </h2>

          {/* 🔍 Search bar */}
          <div className="mx-auto mb-6 max-w-4xl flex flex-col sm:flex-row gap-3 items-center justify-center relative z-50">
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-accent z-50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="Search GitHub users or repositories..."
                className="w-full rounded-lg bg-white/90 py-3 pl-12 pr-12 text-sm shadow-md ring-1 ring-black/5 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none z-50"
              />

              {/* Filter Dropdown */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50">
                <button
                  onClick={() => setFilterOpen((o) => !o)}
                  className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 z-50"
                >
                  <FaFilter />
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-lg bg-white p-4 shadow-xl ring-1 ring-slate-200 z-50">
                    <p className="mb-2 text-sm font-semibold text-slate-700">
                      Search in:
                    </p>
                    <ul className="space-y-2">
                      {FILTER_FIELDS.map((f) => (
                        <li key={f.key} className="flex items-center gap-2">
                          <input
                            id={`check-${f.key}`}
                            type="checkbox"
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500"
                            checked={selected.has(f.key)}
                            onChange={() => toggleFilter(f.key)}
                          />
                          <label
                            htmlFor={`check-${f.key}`}
                            className="text-sm text-slate-600"
                          >
                            {f.label} {f.type === "user" ? "(user)" : "(repo)"}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="rounded-md bg-sky-600 px-5 py-2 text-white text-sm font-medium shadow hover:bg-sky-700 transition"
              >
                <FaSearch className="inline mr-1" /> Search
              </button>
              <button
                onClick={handleClear}
                className="rounded-md bg-red-500 px-5 py-2 text-white text-sm font-medium shadow hover:bg-red-600 transition"
              >
                <FaTimes className="inline mr-1" /> Clear
              </button>
            </div>
          </div>

          {/* Selected Filters */}
          <div className="max-w-4xl mx-auto mb-6 flex flex-wrap gap-2">
            {Array.from(selected).map((k) => {
              const f = FILTER_FIELDS.find((ff) => ff.key === k);
              return (
                <span
                  key={k}
                  className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700"
                >
                  {f?.label || k}
                </span>
              );
            })}
          </div>

          {/* Results */}
          {loading ? (
            <p className="text-center text-gray-500">Loading results...</p>
          ) : results.length === 0 ? (
            <p className="text-center text-gray-500">
              No results. Try another query.
            </p>
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentPage}
                  variants={parentVars}
                  initial="hidden"
                  animate="show"
                  layout
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {paginated.map((item) => {
                    const isRepo = item.type === "repo";
                    const matchPercent = computeMatchPercent(item);
                    return (
                      <motion.div
                        key={`${item.type}-${item.id}`}
                        variants={cardVars}
                        whileHover={{ scale: 1.03 }}
                        className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:ring-2 hover:ring-sky-400 cursor-pointer"
                        onClick={() =>
                          isRepo
                            ? window.open(item.html_url, "_blank")
                            : setActiveUsername(item.login)
                        }
                      >
                        <span className="absolute top-2 right-2 bg-sky-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                          {isRepo ? "Repo" : "User"}
                        </span>

                        {/* Labels + Match */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
                          {(item.matchedBy || [])
                            .slice(0, 2)
                            .map((m, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-800 text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow"
                              >
                                {m}
                              </span>
                            ))}
                          <span className="bg-green-600 text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow">
                            {matchPercent}% match
                          </span>
                        </div>

                        {/* ✅ Background + Foreground */}
                        <div className="relative h-40 w-full overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center opacity-32 blur-sm"
                            style={{ backgroundImage: `url(${item.avatar_url})` }}
                          ></div>
                          <div className="absolute inset-0 bg-white/40"></div>
                          <div className="relative z-10 flex items-center justify-center h-full">
                            <img
                              src={item.avatar_url}
                              alt={isRepo ? item.full_name : item.login}
                              className="w-80 h-56 rounded-full border-2 border-white shadow-lg object-cover"
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-2 p-4 relative z-10 bg-white/80 backdrop-blur-sm">
                          <h3 className="text-sm font-semibold text-slate-900 truncate">
                            {isRepo ? item.full_name : item.login}
                          </h3>
                          {isRepo && item.description && (
                            <p className="text-xs text-slate-600 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-sky-600">
                            {isRepo ? "Visit Repo" : "Explore"} <FaArrowRight />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md border ${
                        currentPage === i + 1
                          ? "bg-sky-600 text-white"
                          : "bg-white text-sky-600"
                      } hover:bg-sky-600 hover:text-white transition`}
                      style={{ minWidth: "38px" }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <GitHubProfileModal
        open={!!activeUsername}
        onClose={() => setActiveUsername(null)}
        username={activeUsername}
      />
    </>
  );
}
