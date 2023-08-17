const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config({ path: './.env' })
const Employee = require('./models/Employee')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const port = 3000


app.use(bodyParser.json());


app.use(cors())

mongoose.connect(process.env.DATABASE_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Atlas connected'))
    .catch((error) => console.error('MongoDB Atlas connection error:', error));



app.post('/api/add', async (req, res) => {
    const { name, mobile, email, id, address, designation, joiningDate, gender, companyName, designationExperience, timePeriod } = req.body;

    if (!name || !mobile || !email || !id || !address || !designation || !joiningDate || !gender || !companyName || !designationExperience || !timePeriod) {
        return res.status(400).json({ error: 'Please provide all fields (name, age, address).' });
    }

    const newEmployee = new Employee({ name, mobile, email, id, address, designation, joiningDate, gender, companyName, designationExperience, timePeriod });

    try {
        await newEmployee.save();
        res.status(200).json({ message: 'Information added successfully.' });
    } catch (err) {
        console.error('Error saving employee information:', err);
        res.status(500).json({ error: 'Failed to save employee information.' });
    }
});


app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (err) {
        console.error('Error retrieving employees:', err);
        res.status(500).json({ error: 'Failed to retrieve employees.' });
    }
});



app.get('/employees/:id', async (req, res) => {
    const employeeId = req.params.id;
    console.log("[INDEX.js] employee id :", employeeId);

    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        res.status(200).json(employee);
    } catch (err) {
        console.error('Error retrieving employee:', err);
        res.status(500).json({ error: 'Failed to retrieve employee.' });
    }
});



//   for deleting a client
app.delete('/employee/:id', async (req, res) => {
    const employeeId = req.params.id;
    console.log('Deleting client with ID:', employeeId);

    try {
        const deletedEmployee = await Employee.findByIdAndRemove(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Client not found.' });
        }
        res.status(200).json({ message: 'Client deleted successfully.' });
    } catch (err) {
        console.error('Error deleting client:', err);
        res.status(500).json({ error: 'Failed to delete client.' });
    }
});


//   for updating a client
app.put('/employee/:id', async (req, res) => {
    const employeeId = req.params.id;
    const { name, mobile, email, id, address, designation, joiningDate, gender, companyName, designationExperience, timePeriod } = req.body;

    if (!name || !mobile || !email || !id || !address || !designation || !joiningDate || !gender || !companyName || !designationExperience || !timePeriod) {
        return res.status(400).json({ error: 'Please provide all fields.' });
    }

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            { name, mobile, email, id, address, designation, joiningDate, gender, companyName, designationExperience, timePeriod },
            { new: true } // Return the updated client data
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Client not found.' });
        }

        res.status(200).json({ message: 'Client updated successfully.', employeeId: updatedEmployee });
    } catch (err) {
        console.error('Error updating client:', err);
        res.status(500).json({ error: 'Failed to update client.' });
    }
});


app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ status: 'error', error: 'Duplicate email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});


app.post('/login', async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })
        console.log(user)
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (isPasswordValid) {
                const token = jwt.sign(
                    {
                        name: user.name,
                        email: user.email,
                    },
                    'secret123'
                )

                return res.status(200).json({ status: 'ok', user: token })
            } else {
                return res.status(401).json({ status: 'error', user: false, remarks: "Email or Password is not valid" })
            }
        }
        else {
            return res.status(401).json({ status: 'error', user: false, remarks: "Email or Password is not valid" })

        }

    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Server error" })

    }

})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})