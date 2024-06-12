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

```
node -v
npm -v
ng version
```

If you don't have Angular CLI installed, you can install it globally using npm:

```
npm install -g @angular/cli
```
Steps to Run the Application
### Clone the Repository
First, clone the repository from GitHub to your local machine. Replace your-github-username with your GitHub username if needed.

```
git clone https://github.com/your-github-username/capital-connect.git
```
### Navigate to the Project Directory
Change your working directory to the project folder:

```
cd capital-connect
```
### Install Dependencies
Install the necessary npm packages specified in the package.json file:


```
npm install
```
### Configure Environment Variables (if applicable)
If your project uses environment variables, ensure you have the correct environment files. Typically, you might need to create a src/environments/environment.ts file or update existing environment files with the necessary API keys and configurations.

For example, you might copy the default environment file and then update it:

```
cp src/environments/environment.example.ts src/environments/environment.ts
```
Then, edit the environment.ts file as needed.

### Run the Application
Start the Angular development server:

```
ng serve
```
By default, this will serve your application at http://localhost:4200/. Open your web browser and navigate to this URL to see the application in action.



