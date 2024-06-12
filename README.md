# CapitalConnect
An investor match making frontend wesbite

# Running the Angular Application "capital-connect" Locally

This guide will walk you through the steps required to run the "capital-connect" Angular application locally after cloning it from GitHub.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. **Node.js** (v14.x or higher)
2. **npm** (v6.x or higher) - This typically comes with Node.js
3. **Angular CLI** (v16.x or higher)

You can check your versions by running the following commands in your terminal:

```bash
node -v
npm -v
ng version

If you don't have Angular CLI installed, you can install it globally using npm:

bash
Copy code
npm install -g @angular/cli
Steps to Run the Application
1. Clone the Repository
First, clone the repository from GitHub to your local machine. Replace your-github-username with your GitHub username if needed.

bash
Copy code
git clone https://github.com/your-github-username/capital-connect.git
2. Navigate to the Project Directory
Change your working directory to the project folder:

bash
Copy code
cd capital-connect
3. Install Dependencies
Install the necessary npm packages specified in the package.json file:

bash
Copy code
npm install
4. Configure Environment Variables (if applicable)
If your project uses environment variables, ensure you have the correct environment files. Typically, you might need to create a src/environments/environment.ts file or update existing environment files with the necessary API keys and configurations.

For example, you might copy the default environment file and then update it:

bash
Copy code
cp src/environments/environment.example.ts src/environments/environment.ts
Then, edit the environment.ts file as needed.

5. Run the Application
Start the Angular development server:

bash
Copy code
ng serve
By default, this will serve your application at http://localhost:4200/. Open your web browser and navigate to this URL to see the application in action.

6. Additional Commands
Here are some additional commands that might be useful during development:

Running Tests: Run unit tests with Karma:

bash
Copy code
ng test
Building the Application: Build the application for production:

bash
Copy code
ng build --prod
Linting the Code: Lint your code using TSLint:

bash
Copy code
ng lint
Troubleshooting
If you encounter any issues, consider the following steps:

Check for Errors: Review the terminal output for any error messages.

Update Dependencies: Ensure all dependencies are up to date by running:

bash
Copy code
npm update
Consult Documentation: Refer to the official Angular documentation for further guidance.

Conclusion
By following these steps, you should be able to successfully run the "capital-connect" Angular application locally. Happy coding!
