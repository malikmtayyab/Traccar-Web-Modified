/* eslint-disable */
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from './LocalizationProvider';

const navoptions = ["sharedOverview", "sharedDrivers", "sharedVehicles"];

function TopNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const t = useTranslation();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Perform navigation based on the selected tab
        if (newValue === 0) {
            navigate("/fuel/overview");
        } else if (newValue === 1) {
            navigate("/fuel/drivers");
        } else if (newValue === 2) {
            navigate("/fuel/vehicles");
        }
    };

    React.useEffect(() => {
        // Update the selected tab based on the current location
        if (location.pathname.startsWith('/fuel/overview')) {
            setValue(0);
        } else if (location.pathname.startsWith('/fuel/drivers')) {
            setValue(1);
        } else if (location.pathname.startsWith('/fuel/vehicles')) {
            setValue(2);
        }
    }, [location]);

    return (
        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {
                    navoptions?.map(name => {
                        return (
                            <Tab label={`${t(name)}`} />
                        )
                    })
                }
            </Tabs>
        </Box>
    );
}
/* eslint-enable */
export default TopNavigation;
