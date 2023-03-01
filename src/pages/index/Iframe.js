import React from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';
// project import
import AuthWrapper from './AuthWrapper';
import { useTheme } from '@mui/material/styles';
import { status } from './auth-forms/pageStatus';
import * as Api from 'api';
import useToast from 'utils/hooks/useToast';

// ================================|| LOGIN ||================================ //

document.body.style.background = 'transparent';

const Iframe = () => {
    const theme = useTheme();
    const toast = useToast();
    const [state, setState] = React.useState(status.redirecting);

    React.useEffect(() => {
        queryCountdown();
    }, []);

    const queryCountdown = async () => {
        const { code, msg, info } = await Api.countdown(location.href).catch((e) => e);
        if (code === 0) {
            const { remain_time } = info || {};
            if (remain_time) {
                //
                return;
            } else {
                //
            }
        } else {
            //
        }
    };

    return (
        <AuthWrapper style={{ background: 'transparent' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="column" justifyContent="center" gap={3} alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3" color={theme.palette.common.white}>
                            {state.title}
                        </Typography>
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            {state.subTitle}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    {state.actionCb?.() || state.action}
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Iframe;
