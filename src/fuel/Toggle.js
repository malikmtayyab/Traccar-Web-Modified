/* eslint-disable */
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function ColorToggleButton(props) {
    const [alignment, setAlignment] = React.useState('AVG. KM/L');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
        props.toggle(newAlignment)
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton value="AVG. KM/L">AVG. KM/L</ToggleButton>
            <ToggleButton value="%IDLING">%IDLING</ToggleButton>
        </ToggleButtonGroup>
    );
}
/* eslint-enable */
export default ColorToggleButton;
