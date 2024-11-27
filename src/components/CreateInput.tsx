import React from "react";
import styled from "styled-components";
const NFTInput = styled.input`
    background:none;
    border:1px solid grey;
    height:2.5rem;
    border-radius:0.75rem;
    color:white;
    padding:0 1.25rem;
    @media (max-width: 500px) {
        width: 100%;
    }
`
const NFTTextareaInput = styled.textarea`
    background:none;
    border:1px solid grey;
    height:2.5rem;
    border-radius:0.75rem;
    color:white;
    padding:0 1.25rem;
    @media (max-width: 500px) {
        width: 100%;
    }
`
interface Props {
    placeholder?: string
    onChange?: any
    width?: number
    textarea?: boolean
    style?: Object
}

export const CreateInput = (props: Props) => {
    const { placeholder, onChange, width = "100%", textarea, style } = props
    return (
        <>
            {textarea ?
                <NFTTextareaInput
                    style={{ minWidth: width, height: 100, ...style }}
                    onChange={(e) => onChange(e.target.value as any)}
                    placeholder={placeholder}
                />
                :
                <NFTInput
                    style={{ minWidth: width, ...style }}
                    onChange={(e) => onChange(e.target.value as any)}
                    type="text"
                    placeholder={placeholder}
                />
            }

        </>
    )
}