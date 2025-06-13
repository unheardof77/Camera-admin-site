

export default function Layout({ children}: { children: React.ReactNode }) {
    return (
        <>
            <header>
                <h1>welcome authorized user</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>© 2023 Your Company Name. All rights reserved.</p>
            <p>Powered by Next.js</p>
            </footer>
        </>
    )
}