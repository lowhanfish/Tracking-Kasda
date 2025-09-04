import React from 'react'
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

function CheckboxzLable({ Title }) {
    const [state, setState] = React.useState({
        label: true,
        required: false,
        disabled: false, // kalau disabled biasanya ga diubah user
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };


    if (Title) {
        return (
            <div className='inputContainer'>
                <div className='inputText'>{Title}</div>
                <FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            className='checkboxz'
                            control={
                                <Checkbox
                                    checked={state.label}
                                    onChange={handleChange}
                                    name="label"
                                />
                            }
                            label="Label"
                        />
                        <FormControlLabel
                            className='checkboxz'
                            required
                            control={
                                <Checkbox
                                    checked={state.required}
                                    onChange={handleChange}
                                    name="required"
                                />
                            }
                            label="Required"
                        />
                        <FormControlLabel
                            className='checkboxz'
                            disabled
                            control={
                                <Checkbox
                                    checked={state.disabled}
                                    onChange={handleChange}
                                    name="disabled"
                                />
                            }
                            label="Disabled"
                        />
                    </FormGroup>

                    {/* <div style={{ marginTop: 16 }}>
                        <p>Label: {state.label ? 'checked' : 'unchecked'}</p>
                        <p>Required: {state.required ? 'checked' : 'unchecked'}</p>
                        <p>Disabled: {state.disabled ? 'checked' : 'unchecked'}</p>
                    </div> */}
                </FormGroup>
            </div>
        )

    } else {
        return (
            <>
                <FormGroup>
                    <FormControlLabel
                        className='checkboxz'
                        control={
                            <Checkbox
                                checked={state.label}
                                onChange={handleChange}
                                name="label"
                            />
                        }
                        label="Label"
                    />
                    <FormControlLabel
                        className='checkboxz'
                        required
                        control={
                            <Checkbox
                                checked={state.required}
                                onChange={handleChange}
                                name="required"
                            />
                        }
                        label="Required"
                    />
                    <FormControlLabel
                        className='checkboxz'
                        disabled
                        control={
                            <Checkbox
                                checked={state.disabled}
                                onChange={handleChange}
                                name="disabled"
                            />
                        }
                        label="Disabled"
                    />
                </FormGroup>

                {/* <div style={{ marginTop: 16 }}>
                    <p>Label: {state.label ? 'checked' : 'unchecked'}</p>
                    <p>Required: {state.required ? 'checked' : 'unchecked'}</p>
                    <p>Disabled: {state.disabled ? 'checked' : 'unchecked'}</p>
                </div> */}
            </>
        )
    }

}

export default CheckboxzLable
