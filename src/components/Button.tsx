const Button = ({ children, onClick }) => (
    <button
        className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary transition duration-300"
        onClick={onClick}
    >
        {children}
    </button>
);

export default Button;
