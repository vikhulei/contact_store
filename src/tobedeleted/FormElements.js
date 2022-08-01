import { InputField } from "../styles/Style"

export function InputFieldTry() {
    return (
        <>
            <InputField
                label="username"
                variant="outlined"
                type="text"
                autoComplete="off"
                required
            />
        </>
    )
}

export function Button () {
    return (
        <>
        <button>Hello</button>
        </>
    )
}

// export default {InputFieldTry, Button}