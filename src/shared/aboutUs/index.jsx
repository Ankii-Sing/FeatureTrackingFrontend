import React from 'react';
import { exec } from 'child_process';

const AboutUs = () => {
    return (
        <div>
            <h1>About Us</h1>
            <p>Welcome to our website. We are dedicated to providing the best service possible.</p>
        </div>
    );
};

export default AboutUs;



// Add the following code to commit and push the changes to GitHub


exec('git add . && git commit -m "Updated AboutUs component" && git push', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});