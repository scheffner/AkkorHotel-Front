import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const LinkBackIcon = (to) => {
    return (
        <Link to={to.to}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
    );
};
