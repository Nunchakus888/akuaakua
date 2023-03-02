import Register from './Register';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';
import FirebaseSocial from './FirebaseSocial';

import * as Api from 'api';
import useToast from 'utils/hooks/useToast';

export const DividerMsg = () => (
    <>
        <Grid item xs={12}>
            <Divider>
                <Typography variant="caption" color={(theme) => theme.palette.text.secondary}>
                    Scan QR codes below to contact customer service
                </Typography>
            </Divider>
        </Grid>

        <Grid item xs={12}>
            <FirebaseSocial />
        </Grid>
    </>
);

const contentCenter = (text) => (
    <Typography align="center" variant="body1">
        {text}
    </Typography>
);

export const closeIframe = (url) => {
    window.parent.postMessage('close-iframe', url);
};
export const onIEvent = (dom, cb) => {
    window.addEventListener(
        'message',
        (e) => {
            console.log('----------onIEvent', e);
            if (!dom) return;
            if (e.data === 'close-iframe') {
                dom.style.display = 'none';
            } else if (e.data === 'open-iframe') {
                dom.style.display = 'block';
            }
            cb?.();
        },
        false
    );
};

export const countdownFmt = (countdown) => {
    // return new Date(countdown).toISOString().slice(11, 19);
    return new Date(countdown).toUTCString().slice(17, 25);
};

export const status = {
    register: {
        title: 'SIGN UP',
        subTitle: contentCenter('Play all AI-generated content models on the entire web for only one dollar'),
        action: <Register />
    },
    iframeInit: {
        TitleCb(countdown) {
            return (
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={3}>
                    <Typography variant="h2" color={(theme) => theme.palette.common.white}>
                        Welcome Back
                    </Typography>

                    <Typography variant="h4" color={(theme) => theme.palette.common.white}>
                        Remaining time: {countdownFmt(countdown)}
                    </Typography>
                </Stack>
            );
        },
        subTitle: contentCenter(`Top-level artificial intelligence models in the industry
         can be freely combined according to your preferences.
         With just a strand of inspiration and creativity from you,
         you can create your own works of art`),
        url: '',
        remains: 0,
        closeIframe,
        ActionCb() {
            const toast = useToast();

            this.jump2pay = async () => {
                const { code, msg, info } = await Api.iframe2pay(this.url).catch((e) => e);
                if (code === 0) {
                    const { pay_url } = info || {};
                    if (pay_url) {
                        window.open(pay_url, 'webui.makamaka.pay');
                    } else {
                        toast(msg || Api.ERROR_MESSAGE, { variant: 'error' });
                    }
                } else {
                    toast(msg || Api.ERROR_MESSAGE, { variant: 'error' });
                }
            };
            return (
                <Stack gap={5} direction="column">
                    <Stack direction="row" justifyContent="space-around" gap={2}>
                        <Button variant="contained" color="primary" size="large" fullWidth onClick={() => this.closeIframe(this.url)}>
                            OK
                        </Button>
                        <Button variant="contained" color="success" size="large" onClick={this.jump2pay} fullWidth>
                            RENEWAL
                        </Button>
                    </Stack>
                    <DividerMsg />
                </Stack>
            );
        }
    },
    redirecting: {
        title: 'REDIRECTING',
        subTitle: contentCenter(`You are being directed to a third-party payment page.
                Please complete the payment within 2 minutes`),
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
                <Typography variant="h2" color={(theme) => theme.palette.common.white}>
                    SUCCESS
                </Typography>
            </Stack>
        ),
        subTitle: contentCenter(`Click on the URL below to enter the Model MARKET.
               The URL has also been sent to your email`),
        link: '',
        actionCb(iframe) {
            return iframe ? (
                <Button variant="outlined" color="success" size="large" fullWidth>
                    RETURN
                </Button>
            ) : (
                <Typography
                    align="center"
                    component={Link}
                    to={this.link}
                    target="_blank"
                    variant="body1"
                    sx={{ textDecoration: 'none' }}
                    color="primary"
                >
                    https://www.google.com/search?q=%E4%BA%8C%E7%BB%B4%E7%A0%81&rlz=1C5CHFA_enHK
                </Typography>
            );
        }
    },
    fail: {
        title: (
            <Stack direction="column" justifyContent="center" alignItems="center">
                <CancelIcon color="error" sx={{ width: '100px', height: '100px', mb: 2 }} />
                <Typography variant="h2" color={(theme) => theme.palette.common.white}>
                    FAILED
                </Typography>
            </Stack>
        ),
        subTitle: contentCenter(`Sorry, you did not complete the payment within 2 minutes.
                You can refresh the page to try again.`),
        link: '',
        iframe: !1,
        actionCb() {
            const onClick = () => {
                if (this.iframe) {
                    window.open(this.link, 'renewal');
                } else {
                    // todo
                    location.href = '/payment';
                }
            };
            return (
                <Stack direction="row" justifyContent="space-around">
                    {/*<Button variant="outlined" color="primary" size="large" fullWidth>
                        RETURN
                    </Button>*/}
                    <Button variant="outlined" color="success" size="large" onClick={onClick} fullWidth>
                        RETRY
                    </Button>
                </Stack>
            );
        }
    }
};
