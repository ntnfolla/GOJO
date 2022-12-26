import { Link } from 'react-router-dom'

const DashHeader = () => {

    const content = (
        <header className="dash-header">
            <div className="dash-header__container">
                <Link to="/dash/houses">
                    <h1 className="dash-header__title">Gojo</h1>
                </Link>
                <nav className="dash-header nav">
                    {/* add nav buttons later */}
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader