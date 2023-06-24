const Card = ({ children }) => {
    return (
        <div
            className={`flex flex-col justify-between bg-white rounded-2xl p-4 h-60`}
        >
            {children}
        </div>
    );
};

export default Card;
