import React, { useState } from 'react';
import './TaskOne.css';

function useForm(initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e, callback) => {
        e.preventDefault();
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length === 0) {
            callback();
            setValues(initialValues);
        } else {
            setErrors(validationErrors);
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
}

function validateForm(values) {
    let errors = {};

    // Валидация имени
    if (!values.firstName.trim()) {
        errors.firstName = 'First name is required';
    }
    if (!values.lastName.trim()) {
        errors.lastName = 'Last name is required';
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(values.email)) {
        errors.email = 'Email is invalid';
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 5) {
        errors.password = 'Password must be at least 5 characters';
    } else if (!passwordRegex.test(values.password)) {
        errors.password = 'Password must contain at least one number and one special character';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}

function TaskOne() {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validateForm);

    const onSubmitHandle = () => {
        alert(JSON.stringify(values));
    };

    return (
        <div className="form-container">
            {Object.keys(errors).length > 0 && (
                <div className="error-message">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            <form onSubmit={(e) => handleSubmit(e, onSubmitHandle)}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="form-input"
                    onChange={handleChange}
                    value={values.firstName}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="form-input"
                    onChange={handleChange}
                    value={values.lastName}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-input"
                    onChange={handleChange}
                    value={values.email}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-input"
                    onChange={handleChange}
                    value={values.password}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-input"
                    onChange={handleChange}
                    value={values.confirmPassword}
                />
                <button type="submit" className="form-button">Register</button>
            </form>
        </div>
    );
}

export default TaskOne;
