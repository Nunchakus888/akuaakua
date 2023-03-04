import React from 'react';
import { useCountDown, useRequest } from 'ahooks';

// material-ui
import { ClickAwayListener, Grid, Stack, Typography, Alert, AlertTitle, Button, Link } from '@mui/material';
// project import
import AuthWrapper from './AuthWrapper';
import { useTheme } from '@mui/material/styles';
import { countdownFmt, jump2start, onIEvent, openIframe, pageState } from './auth-forms/pageStatus';
import * as Api from 'api';
import { UseToast as useToast } from 'utils/hooks';

// ================================|| LOGIN ||================================ //

document.body.style.background = 'transparent';

const Iframe = () => {
    const theme = useTheme();
    const toast = useToast();
    const boxRef = React.useRef();
    const url = (location.search.match(/^\?url=(.*)$/) || [])[1];

    const [deadline, setDeadline] = React.useState({
        remain_time: 0,
        wait_time: 0
    });
    const targetDate = React.useMemo(() => deadline.remain_time || deadline.wait_time || Date.now(), [deadline]);

    pageState.iframeSessionEnd.link = url;
    pageState.iframeInit.link = url;
    const [state, setState] = React.useState(pageState.iframeInit);

    const queryDeadline = async () => {
        const { code, msg, info } = await Api.countdown(url).catch((e) => e);
        if (code === 0) {
            const { remain_time: usable_deadline, deadline: waiting_deadline } = info || {};

            /**
             * 提前1s切换
             * 可用倒计时
             */
            if (usable_deadline - Date.now() > 1) {
                deadline.remain_time = usable_deadline;
            }

            if (waiting_deadline - Date.now() > 1) {
                deadline.wait_time = waiting_deadline;
            }

            // 正常倒计时
            if (deadline.remain_time) {
                setState(pageState.iframeInit);
                // wait countdown
            } else if (deadline.wait_time) {
                setState({ ...pageState.iframeSessionEnd, jump2pay: pageState.iframeInit.jump2pay });
                // 都没有，reset；
            } else {
                setState({ ...pageState.iframeSessionEnd, jump2pay: jump2start });
            }
            setDeadline({ ...deadline });
        } else {
            /**
             * 切换等待状态；
             */
            setState(pageState.iframeSessionEnd);
        }
    };

    const [countdown] = useCountDown({
        targetDate,
        interval: 1000
    });

    React.useEffect(() => {
        if (deadline.remain_time && deadline.remain_time - Date.now() < 1) {
            // reset remain_time, start wait_time countdown.
            deadline.remain_time = 0;
            setDeadline({ ...deadline });
            setState({ ...pageState.iframeSessionEnd, jump2pay: pageState.iframeInit.jump2pay });
        }
        /**
         * 不管何种倒计时，结束前3s，拉起窗口（不可见的话）
         */
        /*if (countdown < 3) {
            const cDom = boxRef.current?.querySelector('#if-content');
            try {
                if (cDom.style.display === 'none') {
                    cDom.style.display = 'block';
                    openIframe(location.href);
                }
            } catch (e) {}
        }*/
    }, [countdown]);

    React.useEffect(() => {
        queryDeadline();
        // 每次切换webui试图，重新计算倒计时；
        onIEvent(boxRef.current?.querySelector('#if-content'), queryDeadline);
    }, []);

    return (
        <div ref={boxRef}>
            <AuthWrapper style={{ background: 'transparent' }}>
                <ClickAwayListener
                    onClickAway={(e) => {
                        // todo session end card
                        console.log('onClickAway----', deadline);
                        if (deadline.remain_time > Date.now()) state.closeIframe(url);
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
                            {state.ActionCb?.(countdown) || state.action}
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
