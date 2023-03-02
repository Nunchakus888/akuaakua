import React from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import { Button, Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import { useTheme } from '@mui/material/styles';
import * as Api from 'api';
import useToast from 'utils/hooks/useToast';
import { status } from './auth-forms/pageStatus';

const Index = () => {
    const theme = useTheme();
    const toast = useToast();
    const { token } = useParams();

    const [state, setState] = React.useState(status[token ? 'redirecting' : 'register']);

    const queryInstanceUrl = async () => {
        if (!token) return;
        const { code, msg, info } = await Api.queryInstanceUrl(token).catch((e) => e);
        if (code === 0) {
            const { instance_url: link } = info || {};
            if (link) {
                setState({ ...status.payed, link });
                return;
            } else {
                toast(msg || Api.ERROR_MESSAGE, { variant: 'error' });
            }
        } else {
            toast(msg || Api.ERROR_MESSAGE, { variant: 'error' });
        }
        setState({ ...status.fail });
    };

    React.useEffect(() => {
        queryInstanceUrl();
    }, [token]);

    return (
        <AuthWrapper style={{ background: '#1E1E1E' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="column" justifyContent="center" gap={3} alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h2" color={theme.palette.common.white}>
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

export default Index;
