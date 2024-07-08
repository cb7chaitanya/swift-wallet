interface ButtonProps {
    onClick?: () => void
    label: string
}

const Button = ({onClick, label}: ButtonProps) => {
    return <button className="bg-zinc-900 hover:bg-zinc-700 duration-300x text-white font-bold py-2 px-4 rounded" onClick={onClick}>{label}</button>
}

export default Button