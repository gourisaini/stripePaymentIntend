import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getProduct, updateCart } from '../services';
import { EcommerceContext } from '../context';
import { CardMedia } from '@mui/material';

export default function CardComponent() {
    const { product, setProduct } = React.useContext(EcommerceContext)

    const fetch = async () => {
        const data = await getProduct()
        setProduct(data?.data)
    }
    React.useEffect(() => {
        fetch()
    }, [])

    const handleAdd = async (value) => {
        const id = localStorage.getItem("userId")
        const data = await updateCart(id, value)
        console.log(data)
    }
    return (
        <Box sx={{ minWidth: 275 }}>

            <ul style={{ listStyle: "none", height: "90vh", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap" }}>
                {product.map((val) => (
                    <li key={val}>
                        <Card variant="outlined" sx={{ padding: "10px", margin: "10px" }}>
                            <Box sx={{ width: "300px" }}>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image="https://images.unsplash.com/photo-1596265371388-43edbaadab94?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="dummy"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {val.title}
                                    </Typography>
                                    <Box display="flex" alignItems="center" sx={{ my: 1 }}>
                                        <Typography color="text.secondary">
                                            Description -
                                        </Typography>
                                        <Typography variant="body2">
                                            {val.description}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">

                                        <Typography color="text.secondary">
                                            Price -
                                        </Typography>
                                        <Typography variant="body2">
                                            {val.price}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { handleAdd(val) }} variant='outlined' size="small">Add to cart</Button>
                                </CardActions>
                            </Box>
                        </Card>
                    </li>
                ))}
            </ul>
        </Box>
    );
}
