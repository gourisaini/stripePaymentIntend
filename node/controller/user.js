import User from "../model/userSchema.js"

export const addUser = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ userId: req.body.userId });
        if (user) {
            return res.status(200).json("Login Successfully")
        }
        await User.create(req.body)
        return res.status(200).json("Login Successfully")
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        console.log(req.body.data)
        const user = await User.findOne({ userId: req.params.id });
        user.cart.push(req.body.data)
        console.log(user)
        user.save()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const removeCart = async (req, res) => {
    try {
        const userId = req.params.id;
        const cartIndexToRemove = req.body.cartIndex;
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.cart.splice(cartIndexToRemove, 1);
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.id });
        if (!user) {
            return badRequest(req, res, null, "user not exist")
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}
