import { useSnackbar } from 'notistack';

export default () => {
    const { enqueueSnackbar } = useSnackbar();
    return (msg, payload) =>
        enqueueSnackbar(msg, {
            variant: 'success',
            anchorOrigin: { horizontal: 'center', vertical: 'top' },
            autoHideDuration: 2000,
            ...(payload || {})
        });
};
