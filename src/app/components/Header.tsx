import Link from "next/link"
import Image from "next/image"

export default function Header(){
    return (
        <header className="w-full flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
                <Image src="/logo.png" alt="StreveHost Logo" width={50} height={50} />
                <span className="text-2xl font-bold text-white">StreveHost</span>
            </div>
            <nav className="flex items-center space-x-8">
                <Link href="/about" className="text-lg font-medium text-white hover:text-gray-200">
                    About
                </Link>
                <Link href="/service" className="text-lg font-medium text-white hover:text-gray-200">
                    Service
                </Link>
                <Link href="/pricing" className="text-lg font-medium text-white hover:text-gray-200">
                    Pricing
                </Link>
                <Link href="/signup" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700">
                    Get Started
                </Link>
            </nav>
        </header>
    )
}