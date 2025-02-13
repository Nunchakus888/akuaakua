import Register from './Register';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedIcon from '@mui/icons-material/Verified';
import React from 'react';
import FirebaseSocial from './FirebaseSocial';

import * as Api from 'api';
import { toast } from 'utils/hooks';
import { message } from 'antd';

export async function jump2pay(values, cb, toastFunc) {
    const { code, msg, info } = await Api.register(values).catch((e) => e);
    if (code === 0) {
        const { pay_url } = info || {};
        if (pay_url) {
            location.href = pay_url;
        } else {
            toast(toastFunc, msg || Api.ERROR_MESSAGE, { variant: 'error' });
        }
    } else {
        toast(toastFunc, msg || Api.ERROR_MESSAGE, { variant: 'error' });
    }
    cb?.();
}

async function jump2renew(link, currentWindow = false) {
    if (link) {
        const { code, msg, info } = await Api.iframe2pay(link).catch((e) => e);
        if (code === 0) {
            const { pay_url } = info || {};
            if (pay_url) {
                if (currentWindow) {
                    location.href = pay_url;
                } else {
                    window.open(pay_url, 'webui.makamaka.pay');
                }
                return;
            } else {
                message.error(msg || Api.ERROR_MESSAGE);
            }
        } else {
            message.error(msg || Api.ERROR_MESSAGE);
        }
    }
    setTimeout(() => {
        window.parent.location.href = '/payment';
    }, 800);
}

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
export const openIframe = (url) => {
    window.parent.postMessage('open-iframe', url);
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
                cb?.();
            }
        },
        false
    );
};

export const countdownFmt = (countdown) => {
    // return new Date(countdown).toISOString().slice(11, 19);
    return new Date(countdown).toUTCString().slice(17, 25);
};

export const jump2start = () => {
    window.parent.location.href = '/payment';
};

export const pageState = {
    register: {
        title: 'SIGN UP',
        subTitle: contentCenter(
            "SUPER DEAL! UNLEASH YOUR CREATIVITY WITH OUR SERVER AND ACCESS VARIOUS AIGC MODELS FOR JUST $0.5 (ORIGINAL PRICE $1). WITH AN RTX 3090 GRAPHICS CARD, 4-CORE CPU WITH 32GB RAM, AND 64GB STORAGE SPACE, YOU'LL HAVE THE POWER TO CREATE YOUR ARTWORK LIKE NEVER BEFORE"
        ),
        action: <Register />
    },
    iframeSessionEnd: {
        title: (
            <Stack direction="column" justifyContent="center" alignItems="center">
                <VerifiedIcon color="info" sx={{ width: '100px', height: '100px', mb: 2 }} />
                <Typography variant="h2" color={(theme) => theme.palette.common.white}>
                    Session ENDED
                </Typography>
            </Stack>
        ),
        subTitle: contentCenter(`Sorry, your usage has ended.
         Thank you for your support`),
        ActionCb(countdown) {
            return (
                <Stack gap={5} direction="column">
                    {countdown ? (
                        <>
                            <Typography variant="body1" align="center" color={(theme) => theme.palette.common.white}>
                                SORRY, YOU DID NOT COMPLETE THE PAYMENT. PLEASE PRESS THE RETRY BUTTON TO PAY AGAIN
                            </Typography>
                            <Button variant="contained" color="primary" size="large" fullWidth onClick={this.jump2pay}>
                                pay now
                            </Button>
                            <Typography variant="h4" align="center" color={(theme) => theme.palette.common.white}>
                                The link will expire in {countdownFmt(countdown)}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Stack direction="row" justifyContent="space-around" gap={2}>
                                <Button variant="contained" color="primary" size="large" fullWidth onClick={jump2start}>
                                    Retry
                                </Button>
                            </Stack>
                            <DividerMsg />
                        </>
                    )}
                </Stack>
            );
        }
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
        link: '',
        closeIframe,
        ActionCb(countdown) {
            this.jump2pay = () => {
                return jump2renew(this.link);
            };

            return (
                <Stack gap={5} direction="column">
                    <Stack direction="row" justifyContent="space-around" gap={2}>
                        <Button
                            disabled={!countdown}
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            onClick={() => this.closeIframe(this.link)}
                        >
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
    loading: {
        title: 'REDIRECTING',
        subTitle: contentCenter(`PLEASE WAIT, WE ARE PREPARING A SERVER FOR YOU`),
        action: (
            <Stack direction="column" justifyContent="center" gap={2} alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                <img src="/assets/rocker.svg" alt="redirecting" />
                <Typography variant="body1" color={(theme) => theme.palette.text.secondary}>
                    do not close this window.
                </Typography>
            </Stack>
        )
    },
    success: {
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
        actionCb() {
            const jump2play = () => {
                // window.open(this.link, 'webui.makamaka');
                window.open(this.link);
            };

            return (
                <Button
                    variant="outlined"
                    color="success"
                    size="large"
                    fullWidth
                    onClick={jump2play}
                    sx={{ textTransform: 'lowercase', overflow: 'hidden' }}
                >
                    {this.link}
                </Button>
            );
        }
    },
    /**
     * 支付 fail case
     * 一定是独立页面存在（非iframe）
     * 路由 /payment/?token
     * 行为：
     *  重试，有token继续请求支付链接
     *  返回，返回payment页面
     */
    fail: {
        title: (
            <Stack direction="column" justifyContent="center" alignItems="center">
                <CancelIcon color="error" sx={{ width: '100px', height: '100px', mb: 2 }} />
                <Typography variant="h2" color={(theme) => theme.palette.common.white}>
                    FAILED
                </Typography>
            </Stack>
        ),
        subTitle: contentCenter(`SORRY, YOU DID NOT COMPLETE THE PAYMENT.
         PLEASE PRESS THE RETRY BUTTON TO PAY AGAIN`),
        link: '',
        actionCb() {
            return (
                <Stack direction="row" justifyContent="space-around" gap={2}>
                    <Button variant="outlined" color="success" size="large" fullWidth onClick={() => jump2renew(this.link, !0)}>
                        RETRY
                    </Button>
                </Stack>
            );
        }
    }
};
