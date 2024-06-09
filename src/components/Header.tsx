import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Address Lookup" },
  { href: "/account", label: "Account" },
];

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className="bg-background p-4 shadow-lg">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-primary text-2xl font-extrabold tracking-wide">
          My DApp
        </div>
        <div className="space-x-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${router.pathname === href
                ? "underline text-primary"
                : ""
                } text-lightGray hover:text-primary text-lg font-semibold transition duration-300`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
