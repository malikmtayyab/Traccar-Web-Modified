/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from './LocalizationProvider';

function Selector(props) {
    const t = useTranslation()
    const [age, setAge] = React.useState(props.title);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t(`${props.title}`)}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    {
                        props.options?.map(option => {
                            return (
                                <MenuItem value={t(`${option}`)}>{t(`${option}`)}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    );
}
/* eslint-enable */
export default Selector;
