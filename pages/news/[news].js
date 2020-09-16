import Layout from '../components/Layout'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'

const All = () => {
    const router = useRouter()
    return (
        <Layout>
            <h1>News no {router.query.news}</h1>
            <p>This section is prepared for the further developement, in case viewers wanted to display all news inside the bitInfo website instead of the original sites.</p>
        </Layout>
    )
}

export default All;