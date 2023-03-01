import React from 'react';

// material-ui
import { Button, Divider, FormHelperText, Grid, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { useTheme } from '@mui/material/styles';
import * as Api from 'api';
import useToast from 'utils/hooks/useToast';

// ============================|| FIREBASE - LOGIN ||============================ //

const Register = () => {
    const theme = useTheme();
    const toast = useToast();

    const jump2pay = async (values, cb) => {
        const { code, msg, info } = await Api.register(values).catch((e) => e);
        if (code === 0) {
            const { pay_url } = info || {};
            if (pay_url) {
                location.href = pay_url;
            } else {
                toast(msg || Api.ERROR_MESSAGE, { variant: 'error' });
            }
        } else {
            toast(msg || Api.ERROR_MESSAGE, { variant: 'error' });
        }
        cb?.();
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
                })}
                onSubmit={async (values, action) => {
                    jump2pay(values, () => {
                        action.setSubmitting(!1);
                    });
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    {/*<InputLabel htmlFor="email-login">Email Address</InputLabel>*/}
                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter your email to receive the URL"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        sx={{
                                            input: {
                                                color: theme.palette.common.white,
                                                '&::placeholder': {
                                                    color: '#9199A5'
                                                }
                                            }
                                        }}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        PAY NOW
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption" color={theme.palette.text.secondary}>
                                        Scan QR codes below to contact customer service{' '}
                                    </Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Register;
