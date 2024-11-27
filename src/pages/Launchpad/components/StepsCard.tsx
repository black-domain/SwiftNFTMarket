import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import CountdownClock from "../../Home/components/CountdownClock";
import "../index.less"
interface StepsProps {
    id: number;
    isEnd: boolean;
    info: ReactNode;
    time?: number;
    deadline?: any;
}
export const StepsCard = (prop: StepsProps) => {
    const { id, isEnd, info, time, deadline } = prop


    return (
        <Card sx={{ color: isEnd ? "rgba(255, 255, 255, 0.7)" : "#e0e0e0", width: "100%", borderRadius: "16px", padding: "1.5rem 2rem", bgcolor: "rgb(23, 24, 26)" }}>
            <Grid container rowGap={"1rem"}>
                <Stack sx={{ width: "100%", alignItems: "center" }} direction={"row"} justifyContent={"space-between"}>
                    <Stack spacing={1} direction={"row"} alignItems={"center"}>
                        <Typography>
                            {
                                isEnd ? "Plase" + id : "Plase" + id + " Ends In"

                            }
                        </Typography>
                        {
                            isEnd &&
                            <Box sx={{ borderRadius: "8px", bgcolor: "grey.800", p: ".2rem 0.5rem" }}>
                                Ineligible
                            </Box>
                        }

                    </Stack>
                    {
                        isEnd ?
                            <Typography sx={{ color: "rgb(255, 163, 97)", fontWeight: 600 }}>Ended</Typography>
                            :
                            <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                {/* <Typography> Ends In</Typography> */}
                                <CountdownClock deadline={deadline} className="launchpad-timeclock" />
                            </Stack>

                    }

                </Stack>
                <Typography >{info}</Typography>
            </Grid>
        </Card>
    )
}
