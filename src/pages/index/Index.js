import React from 'react';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// project import
import Register from './auth-forms/Register';
import AuthWrapper from './AuthWrapper';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// ================================|| LOGIN ||================================ //

const status = {
    register: {
        title: 'SIGN UP',
        subTitle: 'Play all AI-generated content models on the entire web for only one dollar',
        action: <Register />
    },
    redirecting: {
        title: 'REDIRECTING',
        subTitle: (
            <span>
                You are being directed to a third-party payment page. <br />
                Please complete the payment within 2 minutes
            </span>
        ),
        action: (
            <Stack direction="column" justifyContent="center" gap={2} alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                <img src="/assets/rocker.svg" alt="redirecting" />
                <Typography variant="body1" color={(theme) => theme.palette.text.secondary}>
                    do not close this window.
                </Typography>
            </Stack>
        )
    },
    payed: {
        title: (
            <Stack direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h3" color={(theme) => theme.palette.common.white}>
                    SUCCESS
                </Typography>
                <CheckCircleIcon color="success" sx={{ width: '100px', height: '100px', mt: 2 }} />
            </Stack>
        ),
        subTitle: (
            <span>
                Click on the URL below to enter the Model MARKET. <br />
                The URL has also been sent to your email
            </span>
        ),
        link: 'https://www.google.com/search?q=%E4%BA%8C%E7%BB%B4%E7%A0%81&rlz=1C5CHFA_enHK',
        actionCb() {
            return (
                <Typography component={Link} to={this.link} target="_blank" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                    https://www.google.com/search?q=%E4%BA%8C%E7%BB%B4%E7%A0%81&rlz=1C5CHFA_enHK
                </Typography>
            );
        }
    }
};

const Index = () => {
    const theme = useTheme();
    const [state, setState] = React.useState(status.register);

    React.useEffect(() => {}, []);

    return (
        <AuthWrapper>
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

export default Index;
