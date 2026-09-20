import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent">
            <div className="text-center px-6">
                <h1 className="text-7xl md:text-8xl font-bold text-[#FC0000]">
                    404
                </h1>
                <p className="mt-4 text-lg text-[#FC0000]">
                    Page not found
                </p>
                <p className="mt-2 text-sm text-black">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block text-[#FC0000] mt-6 border border-[#FC0000] px-6 py-2 text-sm transition hover:bg-[#FC0000] hover:text-white">
                        Back Home
                </Link>
            </div>
        </div>
    )
}