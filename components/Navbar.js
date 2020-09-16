import Link from 'next/link'

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
            <div className="container">
                <Link as="/" href="/"><a className="navbar-brand"><i className="fab fa-bitcoin fa-2x"></i></a></Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link as="/" href="/" shallow><a className="nav-link">Home</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link as="/news/all" href="/news/all" shallow><a className="nav-link">News</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link as="/about" href="/about" shallow><a className="nav-link">About</a></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;