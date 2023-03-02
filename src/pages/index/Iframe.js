import React from 'react';
import { useCountDown, useRequest } from 'ahooks';

// material-ui
import { ClickAwayListener, Grid, Stack, Typography, Alert, AlertTitle, Button, Link } from '@mui/material';
// project import
import AuthWrapper from './AuthWrapper';
import { useTheme } from '@mui/material/styles';
import { countdownFmt, onIEvent, status } from './auth-forms/pageStatus';
import * as Api from 'api';
import useToast from 'utils/hooks/useToast';

// ================================|| LOGIN ||================================ //

document.body.style.background = 'transparent';

const Iframe = () => {
    const theme = useTheme();
    const toast = useToast();
    const boxRef = React.useRef();
    const url = (location.search.match(/^\?url=(.*)$/) || [])[1];

    status.iframeInit.url = url;
    const [state, setState] = React.useState(status.iframeInit);

    // 5s 一纠偏
    const { data, run, cancel, loading } = useRequest(
        async () => {
            const { code, msg, info } = await Api.countdown(url).catch((e) => e);
            if (code === 0) {
                const { remain_time, deadline = 2 * 60 * 1000 } = info || {};
                console.log('----remain_time', remain_time);
                if (remain_time < 1) {
                    cancel();
                    // state.waitingTime = waitingTime;
                }

                return remain_time;
            } else {
                cancel();
            }
        },
        {
            manual: !0,
            pollingInterval: 5000,
            pollingErrorRetryCount: 3
        }
    );

    const [countdown] = useCountDown({
        leftTime: (data || 0) * 1000
    });

    React.useEffect(() => {
        run();
        onIEvent(boxRef.current?.querySelector('#if-content'), run);
    }, []);

    return (
        <div ref={boxRef}>
            <AuthWrapper style={{ background: 'transparent' }}>
                <ClickAwayListener
                    onClickAway={(e) => {
                        // todo session end card
                        console.log('----data', data);
                        if (data) state.closeIframe(url);
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                gap={3}
                                alignItems="center"
                                sx={{ mb: { xs: -0.5, sm: 0.5 } }}
                            >
                                <Typography variant="h2" color={theme.palette.common.white}>
                                    {state.TitleCb?.(countdown) || state.title}
                                </Typography>
                                <Typography variant="body1" color={theme.palette.text.secondary}>
                                    {state.subTitle}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            {state.ActionCb?.() || state.action}
                        </Grid>
                    </Grid>
                </ClickAwayListener>
            </AuthWrapper>
            <Alert
                variant="filled"
                severity="warning"
                sx={{ position: 'fixed', bottom: 10, right: 10, width: '300px' }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {/*<AlertTitle></AlertTitle>*/}
                There are <strong>{countdownFmt(countdown)}</strong> left until the end of this usage
                <Link underline="hover">
                    <Button variant="text" color="success" onClick={state.jump2pay}>
                        Click here to renew
                    </Button>
                </Link>
            </Alert>
        </div>
    );
};

export default Iframe;
