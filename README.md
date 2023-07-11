# React PHP M-Pesa Safaricom Subscriptions

This is a React website that enables monthly subscription plans with M-Pesa Safaricom integration. Users can sign up for an account and choose from various subscription options. The backend is built using PHP and integrates with the M-Pesa Safaricom API for payment processing.

## Features

- User Registration: Users can create an account on the website.
- Subscription Plans: Users can select from multiple monthly subscription plans.
- M-Pesa Integration: The website integrates with the M-Pesa Safaricom API for secure payment processing.
- Subscription Management: Users can view and manage their subscription details from their account dashboard.
- Automatic Renewal: Paid subscribers' accounts are automatically renewed every 30 days using M-Pesa.
- Upgrade/Downgrade: Subscribers have the option to upgrade or downgrade their subscription plan.
- Notifications: Users receive notifications via email or SMS regarding payment status, renewal, and other subscription-related updates.

## Technologies Used

- React: Frontend framework for building the user interface and handling user interactions.
- PHP: Backend language used for server-side logic, database operations, and M-Pesa API integration.
- MySQL: Database system to store user information, subscription details, and transaction history.
- M-Pesa Safaricom API: Integration with the M-Pesa API for secure payment processing and subscription management.
- HTML/CSS: Markup and styling for the website's frontend.
- Axios: Library for making HTTP requests to the backend API.
- React Router: Library for handling routing within the React application.
- JWT (JSON Web Tokens): Used for authentication and authorization purposes.

## Getting Started

To run this application locally, follow the instructions below:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd react-php-mpesa-subscriptions`
3. Install dependencies: `npm install`
4. Configure the backend API endpoint and M-Pesa API credentials in the appropriate files.
5. Start the development server: `npm start`
6. Open the application in your browser at `http://localhost:3000`.

## Deployment

To deploy the React website and PHP backend to a production environment, you can follow these general steps:

1. Build the React application: `npm run build`
2. Set up a server environment (e.g., Apache, Nginx) to host the PHP backend.
3. Configure the server to serve the React build files.
4. Update the backend API endpoint in the React application to point to the production server.
5. Set up SSL certificates for secure communication with the M-Pesa API.
6. Ensure that the server environment has the necessary dependencies and PHP extensions installed.
7. Deploy the PHP backend to the server and configure it to handle requests.

## Conclusion

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
