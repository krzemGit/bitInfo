import Layout from '../components/Layout'

const About = () => {
    return (
        <Layout>
            <section className="about">
                <h1 className="about__title--main">About bitInfo project</h1>
                <p>This portal has been created for the crypto-currency fans who want to track the latest information about the market and know the current exchange rates.</p>
                <p>The interface at the "Home" section contains graphs with live updates (every 20 seconds) and a form that allows filtering the exchange rates for particular national currencies.</p>
                <p>The selection has been limited to 11 national currencies and 3 popular currencies (bitcoin, litecoin and ethereum) for clarity, but it might be expanded if the interest grow</p>
                <h2>Technical info</h2>
                <p>This project has been built in <span className="tech">Next.js</span>. It includes the use of <span className="tech">Bootstrap</span> framework, <span className="tech">SCSS</span> and <span className="tech">BEM</span> methodology (although not fully, in some cases bootstrap classes were used as selectors) and it is fully responsive. Graph was made with use of <span className="tech">Chart.js</span> library. The news section uses infinity scroll for dynamic content upload.</p>
                <div classname="about__technologies"></div>
            </section>
        </Layout>
    )
}

export default About;