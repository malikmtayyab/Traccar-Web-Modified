/* eslint-disable */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

function TimePeriod(props) {
    const [selectedValue, setSelectedValue] = useState(props.period[0]);

    const handleButtonClick = (value) => {
        setSelectedValue(value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                {props.period?.map((value) => (
                    <Button
                        key={value}
                        style={{ color: value === selectedValue ? 'black' : 'white', backgroundColor: value === selectedValue ? '#546896' : 'transparent' }}
                        onClick={() => handleButtonClick(value)}
                    >
                        {value}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    );
}
/* eslint-enable */
export default TimePeriod;
