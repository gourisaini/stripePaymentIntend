import { Box, List, ListItem, Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React, { useContext } from 'react'
import { EcommerceContext } from '../context';
import { addUser } from '../services';

const Login = () => {
    const { setUser } = useContext(EcommerceContext)
    const handleSuccess = async (res) => {
        const decoded = jwtDecode(res.credential);
        setUser(decoded.sub)
        const data = {
            name: decoded.name,
            userId: decoded.sub,
            email: decoded.email,
            picture: decoded.picture,
        }
        const userData = await addUser(data)
        localStorage.setItem("userId", decoded.sub)
        localStorage.setItem("name", decoded.name)
        localStorage.setItem("email", decoded.email)
        localStorage.setItem("picture", decoded.picture)
    }

    const handleError = (err) => {
        console.log(err)
    }
    return (
        <div>
            <Box sx={{ width: "95vw", height: "95vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                <Typography variant='h4' marginBottom={5}>
                    Login with your google account
                </Typography>

                <Box sx={{}}>
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </Box>



            </Box>

        </div>
    )
}

export default Login
