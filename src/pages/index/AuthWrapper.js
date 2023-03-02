import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
// import Logo from 'components/Logo';
// import AuthFooter from 'components/cards/AuthFooter';

const AuthWrapper = ({ children, style }) => (
    <Box id="if-content" sx={{ minHeight: '100vh', textTransform: 'uppercase', ...style }}>
        <Grid
            container
            direction="column"
            justifyContent="flex-end"
            sx={{
                minHeight: '100vh'
            }}
        >
            {/*<Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
                <Logo />
            </Grid>*/}
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                    // sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                    sx={{ minHeight: { xs: '100vh', md: '100vh' } }}
                >
                    <Grid item>
                        <AuthCard>{children}</AuthCard>
                    </Grid>
                </Grid>
            </Grid>
            {/*<Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                <AuthFooter />
            </Grid>*/}
        </Grid>
    </Box>
);

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;
