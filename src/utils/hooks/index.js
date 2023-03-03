import { useSnackbar } from 'notistack';
import * as Api from 'api';

export const UseToast = () => {
    const { enqueueSnackbar } = useSnackbar();
    return (msg, payload) =>
        enqueueSnackbar(msg, {
            variant: 'success',
            anchorOrigin: { horizontal: 'center', vertical: 'top' },
            autoHideDuration: 2000,
            ...(payload || {})
        });
};

export const toast = (t, msg, payload) => {
    t(msg, {
        variant: 'success',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        autoHideDuration: 2000,
        ...(payload || {})
    });
};

export const QueryInstanceUrl = async (token, setState, status, iframe = false) => {
    const toast = UseToast();

    if (!token) return;
    const { code, msg, info } = await Api.queryInstanceUrl(token).catch((e) => e);
    if (code === 0) {
        const { instance_url: link } = info || {};
        if (link) {
            setState({ ...status.payed, link, iframe });
            return;
        } else {
            toast(msg || Api.ERROR_MESSAGE, { variant: 'error' });
        }
    } else {
        toast(msg || Api.ERROR_MESSAGE, { variant: 'error' });
    }
    setState({ ...status.fail, iframe });
};
