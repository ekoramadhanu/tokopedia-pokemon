import * as React from 'react';
import Image from 'next/image';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import EggOutlinedIcon from '@mui/icons-material/EggOutlined';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Link from 'next/link';

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const Navbar = (props) => {
    const [value, setValue] = React.useState('pokemon');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
                <ElevationScroll {...props}>
                    <AppBar>
                        <Toolbar>
                            <Box sx={{ flexGrow: 1 }}>
                                <Image
                                    src="/logo.png"
                                    alt="logo pokemon" 
                                    width="95" 
                                    height="45"
                                    priority
                                />
                            </Box>
                            <Divider orientation="vertical" flexItem light sx={{ mx: 1 }}/>
                            <Link href="/">
                                <Tooltip title="Pokemon" placement="bottom">
                                    <IconButton style={{ color: 'white' }}>
                                        <PetsOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            <Link href="/my-pokemon">
                                <Tooltip title="Pokemon Saya" placement="bottom">
                                    <IconButton sx={{ mx: 1 }} style={{ color: 'white' }}>
                                        <EggOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
            </Box>
            <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Pokemon
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, }} elevation={3}>
                    <BottomNavigation showLabels sx={{ justifyContent: 'center' }} value={value} onChange={handleChange}>
                        <Link href="/">
                            <BottomNavigationAction
                                label="Pokemon"
                                showLabel
                                value="pokemon"
                                variant="text"
                                icon={<PetsOutlinedIcon />}
                            />
                        </Link>
                        <BottomNavigationAction
                            label="Pokemon Saya"
                            value="myPokemon"
                            variant="text"
                            icon={<EggOutlinedIcon />}
                        />
                    </BottomNavigation>
                </Paper>
            </Box>
        </div>
    );
}

export default Navbar;