import Head from 'next/head';
import * as React from 'react';
import { gql } from '@apollo/client';
import client from '../../plugin/apollo';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useQuery } from 'react-query';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const GET_POKEMONS = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            id
            name
            base_experience
            height
            weight
            abilities{
                ability{
                    name
                }
                is_hidden
            }
            stats{
                base_stat
                stat{
                    name
                }
            }
            sprites {
                back_default
                back_shiny
                front_default
                front_shiny
            }
        }
    }
`;

const fetchPokemon = async (pokemon) => {
    const { data } = await client.query({
        query: GET_POKEMONS,
        variables: {
            name: pokemon,
        },
    });
    return data;
};

export async function getServerSideProps(context) {
    const { name } = context.params;

    return {
        props: {
            name,
        },
    };
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Detail({ name }) {    
    const [open, setOpen] = React.useState(false);
    const [probability, setProbability] = React.useState(null);
    const [pokemon, setPokemon] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const [alert2, setAlert2] = React.useState(false);
    const {data, isLoading} = useQuery(['data', name], () => fetchPokemon(name));

    const handleClickOpen = () => {
        setAlert2(false);
        setLoading(true);        
        setTimeout(() => {
            setLoading(false);        
            const probability = Math.round(Math.random());        
            setProbability(probability);
            if (probability) {
                setPokemon(name);
            }
            setOpen(true);
        }, 2000);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const save = () => {
        setAlert(false);
        let countData = {};
        const listPokemon = [];
        let closeDialog = false;
        // setOpen(false);
        // set list my pokemon
        if (localStorage.getItem("pokemon") === null ) {
            listPokemon.push({
                name: pokemon,
                type: data.pokemon.name,
                image: data.pokemon.sprites.front_default
            })
            closeDialog = true;
            localStorage.setItem('pokemon', JSON.stringify(listPokemon));
        } else {
            listPokemon = [...JSON.parse(localStorage.getItem("pokemon"))];
            const check = listPokemon.find((item) => {
                return item.name == pokemon;
            });
            if ( typeof check == 'object' ) {
                closeDialog = false;
                setAlert(true);
            } else {
                listPokemon.push({
                    name: pokemon,
                    type: data.pokemon.name,
                    image: data.pokemon.sprites.front_default
                })
                closeDialog = true;
                localStorage.setItem('pokemon', JSON.stringify(listPokemon));
            }

        }

        if (closeDialog) {      
            // set count data      
            if (localStorage.getItem("count") === null ){
                countData[name] = 1;
            } else {
                countData = JSON.parse(localStorage.getItem("count"));
                if (countData[name] == undefined) {
                    countData[name] = 1;
                } else {
                    countData[name] += 1;
                }
            }
            localStorage.setItem('count', JSON.stringify(countData));
            setOpen(false);
            setAlert2(true);
        }

    };
    const changeText = (e) => {
        setPokemon(e.target.value);
    }
    if (isLoading) {
        return (
            <div>
                <Head>
                    <title> Pokemon | Detail</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <Container sx={{ my: 9 }}>
                        <Skeleton variant="text" sx={{ py: 1}}/>
                        <Skeleton variant="rectangular" height={300}/>
                    </Container>
                </main>
            </div>
        )
    } else {
        const imageData = [
            {
                img: data.pokemon.sprites.front_default,
                title: `${data.pokemon.name} tampak depan`,
                author: `Gambar Depan`,
            },
            {
                img: data.pokemon.sprites.front_shiny,
                title: `${data.pokemon.name} tampak depan`,
                author: `Gambar Depan`,
            },
            {
                img: data.pokemon.sprites.back_default,
                title: `${data.pokemon.name} tampak belakang`,
                author: `Gambar Belakang`,
            },
            {
                img: data.pokemon.sprites.back_shiny,
                title: `${data.pokemon.name} tampak belakang`,
                author: `Gambar Belakang`,
            },
        ];
    }
    
    // method
    return (
        <div>
            <Head>
                <title> Pokemon | Detail</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Container sx={{ my: 9 }}>
                    <Box component="div" sx={{ py: 1 }}>
                        <Breadcrumbs aria-label="breadcrumb" >
                            <Link color="text.primary" href="/">
                                <Typography color="text.primary" sx={{ cursor: 'pointer' }}> Pokemon</Typography>
                            </Link>
                            <Typography color="text.primary">{data.pokemon.name}</Typography>
                        </Breadcrumbs>
                    </Box>
                    {alert2 ?
                     <>
                        <Alert variant="outlined" severity="success">
                            pokemon berhasil di beri nama
                        </Alert>
                    </>
                    :
                    ''}
                    <Paper elevation={4} sx={{mt:2}}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                                        <ImageList>
                                            {imageData.map((item) => (
                                                <ImageListItem key={item.img}>
                                                    <img
                                                        src={item.img}
                                                        srcSet={item.img}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                    <ImageListItemBar
                                                        title={item.author}
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    </Grid>
                                    <Grid item xl={8} lg={8} md={8} sm={6} xs={12}>
                                        <Typography component="div" variant="h5">
                                            {data.pokemon.name}
                                        </Typography>
                                        <Typography component="div" variant="subtitle1" sx={{ mt: 1 }}>
                                            Status
                                        </Typography>
                                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={1} sx={{ my: 1 }}>
                                            <Chip label={`EXP : ${data.pokemon.base_experience}`} variant="outlined" color="success" />
                                            <Chip label={`Tinggi : ${data.pokemon.height}`} variant="outlined" color="primary" />
                                            <Chip label={`Berat : ${data.pokemon.weight}`} variant="outlined" color="primary" />
                                        </Stack>
                                        <Typography component="div" variant="subtitle1" sx={{ mt: 1 }}>
                                            Serangan dan Pertahanan
                                        </Typography>
                                        <Stack component="div" direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={1} sx={{ my: 1 }}>
                                            <Chip label={`HP : ${data.pokemon.stats[0].base_stat}`} color="error" variant="outlined" />
                                            <Chip label={`Serangan : ${data.pokemon.stats[1].base_stat}`} color="success" variant="outlined" />
                                            <Chip label={`Pertahanan : ${data.pokemon.stats[2].base_stat}`} color="primary" variant="outlined" />
                                            <Chip label={`Serangan Spesial : ${data.pokemon.stats[3].base_stat}`} color="warning" variant="outlined" />
                                        </Stack>
                                        <Stack component="div" direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={1} sx={{ my: 1 }}>
                                            <Chip label={`Pertahanan Spesial : ${data.pokemon.stats[4].base_stat}`} color="warning" variant="outlined" />
                                            <Chip label={`Kecepatan : ${data.pokemon.stats[5].base_stat}`} color="primary" variant="outlined" />
                                        </Stack>
                                        <Typography component="div" variant="subtitle1" sx={{ mt: 1 }}>
                                            Kemampuan
                                        </Typography>
                                        <List dense>
                                            {data.pokemon.abilities.map(item => {
                                                let icon;
                                                if (item.is_hidden) {
                                                    icon = <GradeIcon />;
                                                } else {
                                                    icon = <GradeOutlinedIcon />;
                                                }
                                                return (
                                                    <ListItem key={item.ability.name}>
                                                        <ListItemIcon>
                                                            {icon}
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {item.ability.name}
                                                        </ListItemText>
                                                    </ListItem>
                                                )
                                            }
                                            )}
                                        </List>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Paper>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                        <Button variant="outlined" size="medium" onClick={handleClickOpen}>
                            { loading ?
                            <CircularProgress size={20}/>
                            :
                            'Tangkap Pokemon'}
                        </Button>
                    </Box>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                        disableEscapeKeyDown
                    >
                        <DialogTitle>
                            <Typography component="div" variant="h5">
                                {probability ? 'Selamat Anda Berhasil' : 'Anda Belum Beruntung'}
                            </Typography>
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                             <DialogContentText id="alert-dialog-slide-description">
                                {alert ? 
                                <>
                                    <Alert variant="outlined" severity="error">
                                        nama pokemon sudah ada
                                    </Alert>
                                </>
                                :
                                ''
                                }
                               {probability ? `Anda Berhasil Menangkap ${data.pokemon.name}. ` : 'Silahkan Coba Lagi Anda belum Beruntung'}
                            </DialogContentText>
                            {probability ? 
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nama Pokemon"
                                fullWidth
                                defaultValue={data.pokemon.name}
                                variant="standard"
                                focused
                                onChange={changeText}
                            />
                            : ''}
                        </DialogContent>
                        <DialogActions>
                            {probability ? 
                            <Button onClick={save}>simpan</Button>
                            :
                            <Button onClick={handleClose}>Tutup</Button>}
                        </DialogActions>
                    </Dialog>
                </Container>
            </main>
        </div>
    );
}

export default Detail