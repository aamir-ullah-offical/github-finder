// src/components/profile/GitHubProfileModal.jsx
import { Fragment, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FaArrowRightLong,
  FaGithub,
  FaLocationDot,
  FaUsers,
  FaBuilding,
  FaLink,
  FaTwitter,
} from "react-icons/fa6";
import GithubContext from "../../context/github/githubContext";

export default function GitHubProfileModal({ open, onClose, username, matchScore = 0 }) {
  const { user, repos, getUser, getUserRepos } = useContext(GithubContext);

  /* Fetch user + repos when modal opens */
  useEffect(() => {
    if (open && username) {
      getUser(username);
      getUserRepos(username);
    }
  }, [open, username]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !user || Object.keys(user).length === 0) return null;

  const {
    avatar_url,
    login,
    name,
    bio,
    company,
    blog,
    location,
    twitter_username,
    public_repos,
    followers,
    following,
    hireable,
    created_at,
    html_url,
  } = user;

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-6"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-6"
            >
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-gray-900 shadow-2xl transition-all relative">
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full 
                             bg-white/20 text-white hover:bg-white/30 transition shadow-lg"
                >
                  ✕
                </button>

                {/* Header */}
                <div className="relative h-64 w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
                  <img
                    src={avatar_url}
                    alt={login}
                    className="absolute inset-0 h-full w-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  <div className="relative z-10 flex flex-col h-full justify-end items-center pb-6 text-center">
                    <h2 className="flex items-center gap-2 text-3xl font-bold text-white drop-shadow-lg">
                      <FaGithub /> {name || login}
                    </h2>
                    {bio && <p className="mt-2 max-w-2xl text-gray-300">{bio}</p>}
                  </div>
                  {matchScore > 0 && (
                    <div className="absolute left-6 top-6">
                      <span className="bg-sky-600 px-4 py-1 rounded-full text-white font-semibold shadow">
                        {matchScore}% Match
                      </span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="px-8 py-10 space-y-8">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 text-center">
                    {public_repos !== null && <Stat label="Repos" value={public_repos} />}
                    {followers !== null && <Stat label="Followers" value={followers} />}
                    {following !== null && <Stat label="Following" value={following} />}
                  </div>

                  {/* Details */}
                  {hireable !== null && (
                    <Details
                      label="Hireable"
                      value={hireable ? "Available" : "Not Available"}
                    />
                  )}
                  {company && <Details label="Company" value={company} icon={<FaBuilding />} />}
                  {location && <Details label="Location" value={location} icon={<FaLocationDot />} />}
                  {blog && (
                    <Details
                      label="Website / Blog"
                      value={blog}
                      link
                      icon={<FaLink />}
                    />
                  )}
                  {twitter_username && (
                    <Details
                      label="Twitter"
                      value={`@${twitter_username}`}
                      link={`https://twitter.com/${twitter_username}`}
                      icon={<FaTwitter />}
                    />
                  )}

                  {/* Top Repositories */}
                  {repos?.length > 0 && (
                    <div>
                      <h4 className="mb-3 text-lg font-bold text-white">Top Repositories</h4>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {repos.map((repo) => (
                          <li
                            key={repo.id}
                            className="rounded-lg bg-gray-800 px-4 py-2 hover:bg-gray-700 transition"
                          >
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sky-400 hover:underline"
                            >
                              {repo.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Joined */}
                  {created_at && (
                    <Details
                      label="Joined GitHub"
                      value={new Date(created_at).toLocaleDateString()}
                    />
                  )}
                </div>

                {/* Footer */}
                <div className="bg-gray-800 px-8 py-4 flex justify-end">
                  <a
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-sky-600 to-blue-500 px-6 py-2 text-white font-semibold shadow hover:scale-105 transition"
                  >
                    Visit Profile <FaArrowRightLong />
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/* Stat */
function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-gray-800 p-4 shadow">
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

/* Details */
function Details({ label, value, icon, link }) {
  return (
    <div>
      <h5 className="mb-2 text-lg font-bold text-white">{label}</h5>
      {link ? (
        <a
          href={link || value}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sky-400 hover:underline"
        >
          {icon} {value}
        </a>
      ) : (
        <p className="flex items-center gap-2 text-gray-300">
          {icon} {value}
        </p>
      )}
    </div>
  );
}
