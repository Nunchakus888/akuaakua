// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, IconButton, Stack, Grid, Link } from '@mui/material';

// assets
import Google from 'assets/images/icons/google.svg';
import Twitter from 'assets/images/icons/twitter.svg';
import Facebook from 'assets/images/icons/facebook.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const assets = [
    {
        src: '/assets/dc.png',
        alt: 'dc',
        link: 'https://discord.gg/D5yQZ7EC'
    },
    {
        src: '/assets/wx.png',
        alt: 'wx'
    },
    {
        src: '/assets/qq.png',
        alt: 'qq'
        // link: 'https://qm.qq.com/cgi-bin/qm/qr?k=oKYGgKGghfrh6hMMIz-fFCJmdR-oY5Uk&authKey=oSBUW9f+I5SLAeRdjmCALwKKJkEF4EOrgQmaOOXvDqmPO4JlrEvcJzMeL2OR1Tsb&noverify=0&personal_qrcode_source=0'
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
                    <Link href={i.link} target="_blank">
                        <img style={{ width: '100%', objectFit: 'contain' }} alt="" {...i} />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default FirebaseSocial;
