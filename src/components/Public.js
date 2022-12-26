import { Link } from 'react-router-dom'

const Public = () => {
   const content = (
    <section className="public">
        <header>
            <h1>Welcome to <span className="nowrap">Gojo Looker!</span></h1>
        </header>
        <main className="public__main">
            <p>Located in Addis Abeba, we will show you the most suited one based on your house preference.</p>
            <address className="public__addr">
                Gojo Looks every available House in Addis<br />
                Saris Abo, Addis Abeba<br />
                PO. Box, 00165<br />
                <a href="tel:+251 910 793 950">(251) 251-910793950</a>
                </address>
                <br />
                <p>Owner: Natan Folla</p>
            </main>
            <footer>
                <Link to="/login">Employee login</Link>
        </footer>
        </section>
        
   )
   return content
}
export default Public