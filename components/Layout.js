import Head from 'next/head'
import Navbar from './Navbar'

const Layout = (props) => {
    return (
        <div className="main-container">
            <Head>
                <title>Bit-Info</title>
                <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossOrigin="anonymous" />
            </Head>
            <Navbar />
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}

export default Layout;