import Register from './Register';
import { Button, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';

export const status = {
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
                <CheckCircleIcon color="success" sx={{ width: '100px', height: '100px', mb: 2 }} />
                <Typography variant="h3" color={(theme) => theme.palette.common.white}>
                    SUCCESS
                </Typography>
            </Stack>
        ),
        subTitle: (
            <span>
                Click on the URL below to enter the Model MARKET. <br />
                The URL has also been sent to your email
            </span>
        ),
        link: '',
        actionCb(iframe) {
            return iframe ? (
                <Button variant="outlined" color="success" size="large" fullWidth>
                    RETURN
                </Button>
            ) : (
                <Typography component={Link} to={this.link} target="_blank" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                    https://www.google.com/search?q=%E4%BA%8C%E7%BB%B4%E7%A0%81&rlz=1C5CHFA_enHK
                </Typography>
            );
        }
    },
    fail: {
        title: (
            <Stack direction="column" justifyContent="center" alignItems="center">
                <CancelIcon color="error" sx={{ width: '100px', height: '100px', mb: 2 }} />
                <Typography variant="h3" color={(theme) => theme.palette.common.white}>
                    FAILED
                </Typography>
            </Stack>
        ),
        subTitle: (
            <span>
                Sorry, you did not complete the payment within 2 minutes. <br />
                You can refresh the page to try again.
            </span>
        ),
        link: '',
        iframe: !1,
        actionCb() {
            const onClick = () => {
                if (this.iframe) {
                    window.open(this.link, 'renewal');
                } else {
                    location.href = this.link;
                }
            };
            return (
                <Stack direction="row" justifyContent="space-around">
                    <Button variant="outlined" color="primary" size="large">
                        RETURN
                    </Button>
                    <Button variant="outlined" color="success" size="large" onClick={onClick}>
                        RETRY
                    </Button>
                </Stack>
            );
        }
    }
};
