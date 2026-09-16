import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0e0e0d] py-12">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#8a8a86]">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-[#FFB100]" />
          <span className="text-white font-bold tracking-widest uppercase">IGNITA</span>
          <span>·</span>
          <span>EVENT ENGINE FOR DEVELOPERS</span>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap items-center gap-6 uppercase tracking-wider">
          <Link href="/events" className="hover:text-white transition-colors">
            EVENTS
          </Link>
          <Link href="/Dashboard" className="hover:text-white transition-colors">
            DASHBOARD
          </Link>
          <Link href="/Bookmarks" className="hover:text-white transition-colors">
            BOOKMARKS
          </Link>
          <Link href="/alerts" className="hover:text-white transition-colors">
            ALERTS
          </Link>
          <Link href="/analytics" className="hover:text-white transition-colors">
            ANALYTICS
          </Link>
        </div>

        {/* Right */}
        <div>
          © {new Date().getFullYear()} IGNITA · ALL RIGHTS RESERVED
        </div>

      </div>
    </footer>
  );
};

export default Footer;
