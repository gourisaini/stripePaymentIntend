import axios from "axios";
const url = process.env.REACT_APP_API_KEY

export const getProduct = async () => {
    try {
        const response = await axios.get(`${url}/product/get`)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const addUser = async (user) => {
    try {

        const response = await axios.post(`${url}/user/add`, user)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateCart = async (id, data) => {
    try {
        const response = await axios.put(`${url}/user/update/${id}`, { data })
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const deleteCart = async (id, data) => {
    try {
        const response = await axios.post(`${url}/user/deleteCart/${id}`, { data })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${url}/user/get-by-id/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const payment = async (amount) => {
    try {
        const response = await axios.post(`${url}/payment`, { amount: amount, currency: 'usd' })
        return response
    } catch (error) {
        console.log(error)
    }
}

export const addPayment = async (amount, email, userId) => {
    try {
        const response = await axios.post(`${url}/add-payment`, {
            amount: amount,
            email: email,
            userId: userId
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

