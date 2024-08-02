import PropTypes from 'prop-types';

const CardDefault = ({ imgUrl, title, content }) => {
    return (
        <div className="card mb-4 shadow me-3" style={{ width: "18rem" }}>
            <img className="card-img-top" src={imgUrl} alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
}

CardDefault.propTypes = {
    imgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};

export default CardDefault;
