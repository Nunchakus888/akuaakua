import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }) => (
    <MainCard
        sx={{
            maxWidth: { xs: 475, lg: 568 },
            background: '#232325',
            borderRadius: '25px',
            boxShadow:
                '0px -6px 16px -8px rgba(255, 255, 255, 0.08), 0px 6px 16px -8px rgba(255, 255, 255, 0.08), 6px 0px 4px -8px rgba(255, 255, 255, 0.08), -6px 0px 16px -8px rgba(255, 255, 255, 0.08)',
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
        border={false}
        boxShadow
        shadow={(theme) => theme.customShadows.z1}
    >
        <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
);

AuthCard.propTypes = {
    children: PropTypes.node
};

export default AuthCard;
