import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {useSession, signIn, signOut } from 'next-auth/react';


export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const {data: session} = useSession();

    const whatLinks = () =>{

        if(session?.user.isAdmin){
            return(
                <>
                    <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                    <li><Link href="/api/upload" className="hover:text-gray-300">Upload</Link></li>
                    <li><Link href="/view/videos" className="hover:text-gray-300">Videos</Link></li>
                    <li><Link href="/create/orgowner" className="hover:text-gray-300">Create Organization Owner</Link></li>
                    <li><button onClick={()=> signOut()} >log out</button></li>
                </>
            )
        }
        console.log(session);
        if(session && session?.user?.isOrgOwner){
            return(
                <>
                    <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                    <li><Link href="/api/upload" className="hover:text-gray-300">Upload</Link></li>
                    <li><Link href="/view/videos" className="hover:text-gray-300">Videos</Link></li>
                    <li><Link href="/create/employees" className="hover:text-gray-300">Create Employees</Link></li>
                    <li><button onClick={()=> signOut()} >log out</button></li>
                </>
            )
        }else if(session)  {
            return(
                <>
                    <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                    <li><Link href="/view/videos" className="hover:text-gray-300">Videos</Link></li>
                    <li><button onClick={()=> signOut()} >log out</button></li>
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
        <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
            <nav className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-semibold">{session?.user?.username ? session.user.username: "Welcome"}</h1>
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
    )
}