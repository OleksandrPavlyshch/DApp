import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header className="bg-background p-4 shadow-lg">
            <nav className="max-w-5xl mx-auto flex justify-between items-center">
                <div className="text-primary text-2xl font-extrabold tracking-wide">
                    My DApp
                </div>
                <div className="space-x-6">
                    <Link
                        href="/account"
                        className="text-lightGray hover:text-primary text-lg font-semibold transition duration-300"
                    >
                        Account
                    </Link>
                    <Link
                        href="/"
                        className="text-lightGray hover:text-primary text-lg font-semibold transition duration-300"
                    >
                        Address Lookup
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
