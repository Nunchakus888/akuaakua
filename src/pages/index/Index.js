import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material-ui
import { Button, Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import { useTheme } from '@mui/material/styles';
import * as Api from 'api';
import { UseToast as useToast } from 'utils/hooks';
import { pageState } from './auth-forms/pageStatus';

const cardStatus = {
    fail: 'fail',
    success: 'success'
};

const Index = () => {
    const theme = useTheme();
    const toast = useToast();
    const navigate = useNavigate();
    const { token, status } = useParams();

    const current = token ? 'loading' : cardStatus[status] || 'register';
    const [state, setState] = React.useState(pageState[current]);

    const queryInstanceUrl = async () => {
        if (!token) return;
        const { code, msg, info } = await Api.queryInstanceUrl(token).catch((e) => e);
        if (code === 0) {
            const { instance_url: link } = info || {};
            // todo token 无效
            if (link) {
                // 有link，不一定成功；
                setState({ ...pageState[cardStatus[status]], link });
                return link;
            } else {
                toast(msg || Api.ERROR_MESSAGE, { variant: 'error' });
            }
        } else {
            toast(msg || Api.ERROR_MESSAGE, { variant: 'error' });
        }

        setState({ ...pageState.fail, token });
    };

    React.useEffect(() => {
        if (status && !cardStatus[status]) {
            navigate('/payment', { replace: !0 });
        } else {
            queryInstanceUrl();
        }
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
