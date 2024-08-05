import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const TestForm = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const initialErrors = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        // const { name, email, password, confirmPassword } = values;
        // let formErrors = { ...initialErrors };

        // if (name == '') {
        //     formErrors.name = 'Name is required';
        // }

        // if (email == '') {
        //     formErrors.email = 'Email is required';
        // }

        // if (password == '') {
        //     formErrors.password = 'Password is required';
        // }

        // if (confirmPassword === '') {
        //     formErrors.confirmPassword = 'Confirm Password is required';
        // }

        // if (password != confirmPassword) {
        //     formErrors.confirmPassword = 'Passwords do not match';
        // }

        // setErrors(formErrors);


        const { name, email, password, confirmPassword } = values;
    
        const validationRules = {
            name: { 
                value: name, 
                required: true, 
                message: 'Name is required' 
            },
            email: { 
                value: email, 
                required: true, 
                message: 'Email is required',
                validate: (value) => /\S+@\S+\.\S+/.test(value) || 'Email is invalid'
            },
            password: { 
                value: password, 
                required: true, 
                message: 'Password is required',
                validate: (value) => value.length >= 6 || 'Password must be at least 6 characters long'
            },
            confirmPassword: { 
                value: confirmPassword, 
                required: true, 
                message: 'Confirm Password is required' 
            }
        };

        let formErrors = { ...initialErrors };

        // Validate each field
        for (const field in validationRules) {
            const { value, required, message, validate } = validationRules[field];
            
            if (required && value === '') {
                formErrors[field] = message;
            } else if (validate) {
                const validationResult = validate(value);
                if (validationResult !== true) {
                    formErrors[field] = validationResult;
                } else {
                    formErrors[field] = '';
                }
            } else {
                formErrors[field] = '';
            }
        }

        if (password !== confirmPassword) {
            formErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(formErrors);

        const hasErrors = Object.values(formErrors).some((error) => error !== '');
        if (hasErrors) {
            console.log('Form has errors:', formErrors);
            return;
        }

        console.log('Form submitted successfully with values:', values);

    }

    return (
        <div>
            <div className="flex w-full gap-16 flex-col">
                <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
                    <Input onChange={handleOnChange} name="name" type="text" label="Username" />
                    <Input onChange={handleOnChange} name="email" type="email" label="Email" />
                    <Input onChange={handleOnChange} name="password" type="password" label="Password" />
                    <Input onChange={handleOnChange} name="confirmPassword" type="password" label="Repeat Password" />
                    <Button type="submit">Submit</Button>
                </form>
                <ul className="list-disc">
                    {Object.values(errors).filter((error) => error !== '').map((error, index) => (
                        <li className="text-red-500" key={index}>{error}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TestForm;