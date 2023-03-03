// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack, Grid } from '@mui/material';

// assets
import Google from 'assets/images/icons/google.svg';
import Twitter from 'assets/images/icons/twitter.svg';
import Facebook from 'assets/images/icons/facebook.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const assets = [
    {
        src: '/assets/dc.png',
        alt: 'dc'
    },
    {
        src: '/assets/wx.png',
        alt: 'wx'
    },
    {
        src: '/assets/qq.png',
        alt: 'qq'
    }
];
const FirebaseSocial = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const googleHandler = async () => {
        // login || singup
    };

    const twitterHandler = async () => {
        // login || singup
    };

    const facebookHandler = async () => {
        // login || singup
    };

    return (
        <Grid
            container
            xs={12}
            direction="row"
            spacing={matchDownSM ? 1 : 2}
            justifyContent={matchDownSM ? 'space-around' : 'space-between'}
            sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
        >
            {assets.map((i) => (
                <Grid item xs={4}>
                    <img style={{ width: '100%', objectFit: 'contain' }} alt="" {...i} />
                </Grid>
            ))}
        </Grid>
    );
};

export default FirebaseSocial;
