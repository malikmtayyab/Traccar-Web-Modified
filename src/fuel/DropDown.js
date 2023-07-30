/* eslint-disable */
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from '../common/components/LocalizationProvider';

function DropDown() {

    const t = useTranslation()
    const [selectedOption, setSelectedOption] = React.useState('vehicle');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedOption}
                    onChange={handleChange}
                    label="Age"
                    style={{ color: 'white', fontWeight: 'normal', fontSize: 25 }}
                >
                    <MenuItem value={"vehicle"}>{t("vehicleTypeTitle")}</MenuItem>
                    <MenuItem value={"car"}>{t("categoryCar")}</MenuItem>
                    <MenuItem value={"truck"}>{t("categoryTruck")}</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
/* eslint-enable */
export default DropDown;
