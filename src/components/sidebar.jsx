import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/eco-shopping-assistant">Eco Shopping Assistant</Link></li>
            </ul>
        </nav>
    );
};

export default Sidebar;
