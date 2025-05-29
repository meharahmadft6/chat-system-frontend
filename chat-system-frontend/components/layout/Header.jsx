import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-700">
          EduConnect
        </Link>

        <nav className="space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
