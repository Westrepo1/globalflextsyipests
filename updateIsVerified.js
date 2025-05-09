const mongoose = require('mongoose');
const User = require('./server/Model/User'); // Adjust the path to your User model

async function updateAllUsersIsVerified() {
    try {
        // Connect to your MongoDB database
        await mongoose.connect('mongodb+srv://pius1:pius123@webdevelopment.xav1dsx.mongodb.net/globalflextyipests', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Update all users to set isVerified to true
        const result = await User.updateMany(
            {}, // Empty filter to match all documents
            { $set: { isVerified: true } }
        );

        console.log(`Update complete. ${result.modifiedCount} users' isVerified status set to true.`);

        // Close the database connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error updating users:', error);
    }
}

// Run the function
updateAllUsersIsVerified();