import { useState } from "react";
import logo from "../assets/logo.png";
import { NAVIGATION_LINKS } from "../constants";
import { FaBars, FaTimes } from "react-icons/fa"; // ✅ Import FaBars

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const offset = -85;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY + offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="fixed left-0 right-0 top-4 z-50">
            {/* Desktop Menu */}
            <div className="mx-auto hidden max-w-2xl items-center justify-center rounded-lg border border-stone-50/30 bg-black/20 py-3 backdrop-blur-lg lg:flex">
                <div className="flex items-center justify-between gap-6">
                    <a href="#">
                        <img src={logo} alt="logo" width={150} />
                    </a>
                    <ul className="flex items-center gap-4">
                        {NAVIGATION_LINKS.map((item, index) => (
                            <li key={index}>
                                <a className="text-sm hover:text-yellow-400" href={item.href} onClick={(e) => handleLinkClick(e, item.href)}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg">
                <div className="flex items-center justify-between">
                    <a href="#">
                        <img src={logo} alt="logo" width={90} className="m-2" />
                    </a>
                    <button className="focus:outline-none" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? (
                            <FaTimes className="m-2 h-6 w-6 text-white" />
                        ) : (
                            <FaBars className="m-2 h-6 w-6 text-white" />
                        )}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <ul className="absolute left-0 top-16 w-full bg-black/80 backdrop-blur-md flex flex-col items-center gap-4 p-4">
                        {NAVIGATION_LINKS.map((item, index) => (
                            <li key={index}>
                                <a className="block text-white text-lg hover:text-yellow-400" href={item.href} onClick={(e) => handleLinkClick(e, item.href)}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
