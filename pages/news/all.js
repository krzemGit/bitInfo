import Layout from '../../components/Layout'
import NewsList from '../../components/NewsList'

// section for displaying the news, in separate folder in case of further developement of separate component for displaying single news


const All = () => {
    return (
        <Layout>
            <h1 className="news__title">News section</h1>
            <p className="news__subtitle">Here you can read the latest news about the crypto-currency market.</p>
            <NewsList />
        </Layout>
    )
}

export default All;