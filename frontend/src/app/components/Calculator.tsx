import { useState } from "react"
import styled from "styled-components"

const CalculatorContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: center;
    align-items: center;
    width: 250px;
    input{
        width: 100%;
        height: 2em;
        margin-bottom: 1em;
    }
`

const AddButton = styled.button`
    background-color: dodgerblue;
    color: white;
    padding: .5em;
    border-radius: 5px;
    border: none;
    width: 100%;
    &:disabled{
        background-color: gray;
    }
`

export const Calculator = () => {
    const [first, setFirst] = useState<string>("")
    const [second, setSecond] = useState<string>("")
    const [result, setResult] = useState<number>(0)
    const handleAddition = () => {
        fetch('http://localhost:8000/add', {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ a: first, b: second })
        })
            .then((res: Response) => res.json())
            .then((data) => {
                setResult(data)
            })
    }
    return (
        <CalculatorContainer>
            <h1>Add Two Numbers</h1>
            <input
                placeholder="First Number"
                type="number"
                id="first"
                name="first"
                value={first}
                onChange={(e) => {
                    setFirst(e.target.value)
                }}
            />
            <input
                placeholder="Second Number"
                type="number"
                id="second"
                name="second"
                value={second}
                onChange={(e) => {
                    setSecond(e.target.value)
                }}
            />
            <AddButton
                onClick={handleAddition}
                disabled={first.length === 0 || second.length === 0}
                id="addbutton"
            >
                Add Two Numbers
            </AddButton>
            <div>Result</div>
            <div>{result}</div>
        </CalculatorContainer>
    )
}