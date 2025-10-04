// src/components/Header.jsx
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { BiMenu, BiX } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../assets/LoginButton.css";

const BAR_H = 40;

/* nav schema (desktop + mobile) */
const NAV_LINKS = [
{ label: "Home", path: "/", type: "route" },
{ label: "About", path: "/about", type: "route" },
{ label: "FAQ", path: "/#faq", type: "hash" },
{ label: "Contact", path: "/#contact", type: "hash" },
{ label: "Feedback", path: "/#testimonials", type: "hash" },
];

export default function Header() {
const [scrolled, setScrolled] = useState(false);
const [open, setOpen] = useState(false);
const location = useLocation();

useEffect(() => {
const handle = () => setScrolled(window.scrollY > BAR_H);
handle();
window.addEventListener("scroll", handle);
return () => window.removeEventListener("scroll", handle);
}, []);

// jab bhi route ya hash change ho → mobile drawer close
useEffect(() => {
setOpen(false);
}, [location]);

/* active checker */
const isActiveLink = (path, type) => {
if (type === "hash") {
return location.hash === path.replace("/#", "#");
}
if (path === "/") {
return location.pathname === "/" && location.hash === "";
}
return location.pathname === path;
};

/* link style helper */
const linkClass = (isActive) =>
`relative pb-1 after:absolute after:bottom-0 after:left-0  
     after:h-[2px] after:bg-[var(--nav-hover-color)]  
     after:transition-all ${  
       isActive  
         ? "after:w-full font-semibold text-[var(--nav-hover-color)]"  
         : "after:w-0"  
     }`;

/* animation variants */
const barV = {
show: { y: 0, opacity: 1, transition: { duration: 0.45 } },
hide: { y: "-100%", opacity: 0, transition: { duration: 0.45 } },
};
const navV = {
show: { y: 0, transition: { duration: 0.45 } },
shift: { y: -BAR_H, transition: { duration: 0.45 } },
};
const drawer = {
hidden: { x: "100%", opacity: 0 },
show: { x: 0, opacity: 1, transition: { duration: 0.35 } },
exit: { x: "100%", opacity: 0, transition: { duration: 0.25 } },
};

return ( <header className="sticky top-0 z-[997]">
{/* ── top bar ── */}
<motion.div
variants={barV}
animate={scrolled ? "hide" : "show"}
className="flex h-10 items-center bg-[#1977cc] px-4 text-sm text-white"
> <div className="container mx-auto flex flex-wrap items-center justify-center gap-y-2 sm:justify-between"> <span className="flex items-center gap-1"> <i className="bi bi-envelope" /> <HashLink  
           smooth  
           to="/#contact"  
           className="whitespace-nowrap hover:underline"  
         >
Need Help? Contact Support </HashLink> </span>

      <span className="flex items-center gap-4">  
        <a href="https://github.com/aamir-ullah-offical"><i className="bi bi-github" /></a>  
        <a href="https://www.facebook.com/AamirUllahOfficial/"><i className="bi bi-facebook" /></a>  
        <a href="https://www.instagram.com/aamir_ullah_official/"><i className="bi bi-instagram" /></a>  
        <a href="https://www.linkedin.com/in/aamirullahofficial/"><i className="bi bi-linkedin" /></a>  
      </span>  
    </div>  
  </motion.div>  

  {/* ── branding + desktop nav ── */}  
  <motion.div  
    variants={navV}  
    animate={scrolled ? "shift" : "show"}  
    className="w-full bg-[#e4f1fc] shadow-sm backdrop-blur-sm"  
  >  
    <div className="container mx-auto flex items-center justify-between px-4 py-3">  
      {/* logo */}  
      <Link to="/" className="ml-[10px] flex items-center gap-2">  
        <img  
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGVhNHg3Nm15NnRhOGx3ZzR3aGh0OXg2OXpsZWdhaW05MnBzY3p3dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12zV7u6Bh0vHpu/giphy.gif"  
          alt="GitHub Finder"  
          className="h-12 mix-blend-multiply"  
        />  
        <h1  
          className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#1977cc] via-[#0aa6bd] to-[#00c4ff] bg-clip-text text-transparent drop-shadow-sm"  
          style={{  
            fontFamily: '"Poppins", "Raleway", sans-serif',  
            letterSpacing: "0.5px",  
          }}  
        >  
          GitHub Finder  
        </h1>  
      </Link>  

      {/* desktop nav */}  
      <nav className="hidden xl:flex items-center gap-6 font-[var(--nav-font)]">  
        {NAV_LINKS.map(({ label, path, type }) =>  
          type === "hash" ? (  
            <HashLink  
              smooth  
              key={label}  
              to={path}  
              className={linkClass(isActiveLink(path, type))}  
            >  
              {label}  
            </HashLink>  
          ) : (  
            <NavLink  
              key={label}  
              to={path}  
              onClick={  
                label === "Home"  
                  ? () => window.scrollTo({ top: 0, behavior: "smooth" })  
                  : undefined  
              }  
              className={() => linkClass(isActiveLink(path, type))}  
            >  
              {label}  
            </NavLink>  
          )  
        )}  
      </nav>  

      {/* github button & burger */}  
      <div className="flex items-center gap-4">  
        <Link  
          to="https://github.com"  
          target="_blank"  
          className="button-89 hidden xl:block"  
          role="button"  
        >  
          GitHub  
        </Link>  

        {/* mobile menu button */}  
        <button  
          onClick={() => setOpen(true)}  
          className="text-3xl xl:hidden"  
          aria-label="Open menu"  
        >  
          <BiMenu />  
        </button>  
      </div>  
    </div>  
  </motion.div>  

  {/* ── mobile drawer ── */}  
  <AnimatePresence>  
    {open && (  
      <motion.aside  
        variants={drawer}  
        initial="hidden"  
        animate="show"  
        exit="exit"  
        className="fixed right-0 top-0 z-[9998] h-full w-[85%] max-w-xs bg-[#a3bed6] shadow-lg  
                   backdrop-blur-xl xl:hidden"  
      >  
        {/* close btn */}  
        <button  
          onClick={() => setOpen(false)}  
          className="absolute right-4 top-4 text-3xl text-[var(--nav-color)]"  
          aria-label="Close menu"  
        >  
          <BiX />  
        </button>  

        <ul className="mt-20 flex flex-col gap-3 px-6">  
          {NAV_LINKS.map(({ label, path, type }) => (  
            <li key={label}>  
              {type === "hash" ? (  
                <HashLink  
                  smooth  
                  to={path}  
                  className={linkClass(isActiveLink(path, type))}  
                >  
                  {label}  
                </HashLink>  
              ) : (  
                <NavLink  
                  to={path}  
                  onClick={  
                    label === "Home"  
                      ? () => window.scrollTo({ top: 0, behavior: "smooth" })  
                      : undefined  
                  }  
                  className={() => linkClass(isActiveLink(path, type))}  
                >  
                  {label}  
                </NavLink>  
              )}  
            </li>  
          ))}  

          {/* GitHub button in mobile */}  
          <li>  
            <a  
              href="https://github.com"  
              target="_blank"  
              rel="noopener noreferrer"  
              className="block rounded-md px-4 py-3 font-medium text-[var(--nav-color)]  
                         transition hover:bg-[var(--accent-color)] hover:text-[var(--contrast-color)]"  
            >  
              GitHub  
            </a>  
          </li>  
        </ul>  
      </motion.aside>  
    )}  
  </AnimatePresence>  
</header>  

);
}
