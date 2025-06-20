
import '@/app/globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import {useSession, signIn, signOut } from 'next-auth/react';


export default function Layout({ children }: { children: React.ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const {data: session} = useSession();

    const whatLinks = () =>{
        console.log(session)
        
        if(session && session?.user?.isOrgOwner){
            return(
                <>
                    <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                    <li><Link href="/upload" className="hover:text-gray-300">Upload</Link></li>
                    <li><Link href="/allVideos" className="hover:text-gray-300">Videos</Link></li>
                    <li><Link href="/createEmployees" className="hover:text-gray-300">Create Employees</Link></li>
                    <li><button onClick={()=> signOut()} >log out</button></li>
                </>
            )
        }else if(session)  {
            return(
                <>
                    <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                    <li><Link href="/allVideos" className="hover:text-gray-300">Videos</Link></li>
                </>
            )
        } else {
            return(
                <>
                    <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                    <li><button onClick={() => signIn()} >Login</button></li>
                </>
            )
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
                <nav className="flex items-center justify-between">
                    <h1 className="text-xl sm:text-2xl font-semibold">Welcome, Authorized User</h1>
                    <div className="sm:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                    <ul className="hidden sm:flex space-x-4 text-sm">
                        {whatLinks()}
                    </ul>
                </nav>
                {menuOpen && (
                    <ul className="sm:hidden mt-4 space-y-2 text-sm">
                        {whatLinks()}
                    </ul>
                )}
            </header>
            <main className="flex-1 p-6">{children}</main>
            <footer className="bg-gray-800 text-gray-300 px-6 py-4 text-sm text-center">
                <p>© 2023 Your Company Name. All rights reserved.</p>
                <p className="text-gray-400">Powered by Next.js</p>
            </footer>
        </div>
    );
}
