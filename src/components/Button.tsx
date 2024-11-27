interface Props {
    text: string
    style?:any
    small?:boolean
    onClick?:()=>void
}

export const Button = (props: Props) => {
    const {text,style,small,onClick} = props
    return (
        <>
            {small?
                <button style={{
                    padding: "0.625rem 1.25rem",
                    borderRadius: "1rem",
                    background: "#3b82f6",
                    color: "white",
                    cursor: "pointer",
                    transform:"scale(0.6)",
                    ...style

                }} onClick={onClick}>{text}
                </button>
                :
                <button style={{
                    padding: "0.625rem 1.25rem",
                    borderRadius: "0.75rem",
                    background: "#3b82f6",
                    color: "white",
                    margin: "0.75rem 0.75rem 0.75rem 0",
                    cursor: "pointer",
                    ...style

                }} onClick={onClick}>{text}
                </button>
            }

        </>
    )
}