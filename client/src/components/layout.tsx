
import '../app/globals.css';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            <Header/>
            <main className="flex-1 p-6">{children}</main>
            <footer className="bg-gray-800 text-gray-300 px-6 py-4 text-sm text-center">
                <p>© 2023 Your Company Name. All rights reserved.</p>
                <p className="text-gray-400">Powered by Next.js</p>
            </footer>
        </div>
    );
}
