import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/10 px-6 py-10">
      {" "}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold">Ignita</h3>
          <p className="text-gray-400 text-sm mt-1">
            Discover and track tech opportunities
          </p>
        </div>
        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/events" className="hover:text-white transition">
            Events
          </Link>
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
          <Link href="/bookmarks" className="hover:text-white transition">
            Bookmarks
          </Link>
          <Link href="/profile" className="hover:text-white transition">
            Profile
          </Link>
        </div>
        {/* Right */}
        <div className="text-gray-500 text-sm text-center md:text-right">
          © {new Date().getFullYear()} Ignita. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
