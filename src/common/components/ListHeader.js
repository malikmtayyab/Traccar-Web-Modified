/* eslint-disable */
import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useTranslation } from "./LocalizationProvider";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ColoredItem = styled(Item)({
    backgroundColor: '#dedfe0', // Add your desired background color here
});

const ListHeader = () => {
    const t = useTranslation()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={9}>
                <Grid item xs={1}>
                    <ColoredItem>{t("vehicelTitle")}</ColoredItem>
                </Grid>
                <Grid item xs={1}>
                    <ColoredItem>{t("utilizationTitle")}</ColoredItem>
                </Grid>
                <Grid item xs={1}>
                    <ColoredItem>{t("idleTimeTitle")}</ColoredItem>
                </Grid>
                <Grid item xs={1}>
                    <ColoredItem>{t("PTOTimeTitle")}</ColoredItem>
                </Grid>
                <Grid item xs={1}>
                    <ColoredItem>{t("idleFuelwithoutmeasure")}</ColoredItem>
                </Grid>
                <Grid item xs={1}>
                    <ColoredItem>{t("drivingTimeTitle")}</ColoredItem>
                </Grid>
                <Grid item xs={1}>
                    <ColoredItem>{t("drivingFuelTitle")}</ColoredItem>
                </Grid>
                <Grid item xs={1}>
                    <ColoredItem>{t("sharedDistance")}</ColoredItem>
                </Grid>
                <Grid item xs={1}>
                    <ColoredItem>{t("fuelEfficiencyTitle")}</ColoredItem>
                </Grid>
            </Grid>
        </Box>
    )
}
/* eslint-enable */
export default ListHeader;
