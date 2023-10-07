import styled from "@emotion/styled"

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 1;
    margin: 5rem;
    border-radius: 5px;
    box-shadow: 5px 7px 7px lightgray;
    border: 1px solid lightgray;
    height: 80vh;
    overflow: hidden;
`

export const LeftSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(45deg, #ff00c8, #f2bf33);
    text-align: center;
    height: 100%;
`
export const RightSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
`

export const Branding = styled.h1`
    color: whitesmoke;
    font-size: 42px;
    font-weight: 700;
    text-shadow: 1px 1px 1px lightgray;
`
export const Label = styled.label`
    display: block;
    font-size: 21px;
    color: #0a6073;
`
