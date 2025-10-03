// src/App.jsx
import { Routes, Route, Outlet } from "react-router-dom";
import { Suspense, lazy, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";

import PageLoader from "./components/common/PageLoader";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// Context Providers
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import GithubContext from "./context/github/githubContext";

// Modal
import GitHubProfileModal from "./components/widgets/GitHubProfileModal";

/* Lazy-loaded pages */
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* Layout wrapper */
function Layout() {
  const { user } = useContext(GithubContext);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1 scroll-smooth pb-4">
        <Outlet context={{ openModal, setOpenModal }} />
      </main>
      <Footer />

      {/* Global Profile Modal */}
      <GitHubProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={user}
        matchScore={90}
      />
    </>
  );
}

export default function App() {
  return (
    <GithubState>
      <AlertState>
        <div className="flex min-h-screen flex-col bg-[#f9fafb] text-gray-800">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Route>

              {/* 404 without layout */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          {/* Global Toast Notifications */}
          <Toaster
            position="top-center"
            toastOptions={{ style: { fontSize: "14px" } }}
          />
        </div>
      </AlertState>
    </GithubState>
  );
}
