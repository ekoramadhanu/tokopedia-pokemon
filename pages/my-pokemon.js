import Head from 'next/head';
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default class myPokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: [],
            skeleton : true,
        };
    }
    async componentDidMount() {
        if (localStorage.getItem("pokemon") !== null) {
            await this.setState({ pokemon: JSON.parse(localStorage.getItem("pokemon")) })
        }
        await this.setState({ skeleton: false })
    }
    async remove(value) {
        let countData = 0;
        if (localStorage.getItem("count") === null) {
            countData = 0;
          } else {
            countData = JSON.parse(localStorage.getItem("count"));
          }
        const index = this.state.pokemon.findIndex((item)=> {
            return item.name === value.name;
        })
        if (index > -1) {
            this.state.pokemon.splice(index,1)
            await this.setState({ pokemon: this.state.pokemon})
        }
        localStorage.setItem('pokemon', JSON.stringify(this.state.pokemon));
        countData[value.type] -= 1;
        localStorage.setItem('count', JSON.stringify(countData));

    }
    render() {
        return (
            <div>
                <Head>
                    <title> Pokemon | Pokemon Saya</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <Container component={"div"} sx={{ my: 9}}>
                        {this.state.pokemon.length === 0 ?
                            <Box >
                                <Alert variant="outlined" severity="error">
                                    pokemon saya belum ada silahkan tangkap terlebih dahulu
                                </Alert>
                            </Box>
                            :
                            <Grid container spacing={2}>
                                {
                                    this.state.pokemon.map(item => {
                                        return(
                                            <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key= {item.name}>
                                                <Paper elevation={4}>
                                                    <Card sx={{ cursor: 'pointer' ,height: 400 }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="200"
                                                            image={item.image}
                                                            alt={item.name}
                                                            sx={{ objectFit: 'contain', m: 1 }}
                                                        />
                                                        <CardContent sx={{height: '10%'}}>
                                                            <Typography gutterBottom variant="h4" component="div" align="center">
                                                                {item.name}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions sx={{height: '40%'}}>
                                                            <Button 
                                                                sx={{width: '100%'}} 
                                                                variant="contained" 
                                                                color="error"
                                                                onClick={(e) => this.remove(item)}
                                                            >
                                                                Lepaskan
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Paper>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>}
                    </Container>
                </main>
            </div>
        )
    }
}