# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Starting the project

-for components i used shadcn UI 

Shadcn is a UI library that provides reusable components for building user interfaces. It's different from other UI libraries like Material UI and Chakra UI because it lets you download the source code for individual components, rather than accessing them through a bundled package

-setup the shadcn ui

-install react-router-dom for routing

const App = () => {

  const appRouter = createBrowserRouter([
    {path: '*', element: <Navigate to="/auth" />},
    {path: '/auth', element: <Auth />}, 
    {path: '/chat', element: <Chat />},
    {path: '/profile', element: <Profile />},

  ]);


  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

-creating a auth route page ui



# SERVER

-initialize npm 
-create index.js
-install packages expres dotenv cors cookie-parser mongoose bcrypt 

//"type": "module", adding  this line to the package.json file makes easy to export 
-install nodemon [npm i nodemon --save-dev]

-what are dev dependencies ? 
-dev dependencies are packages that are required for development, but not for production. They are not included in
the production bundle. 
-we need dev dependencies for development tools like linters, formatters, and testing frameworks. They help
us catch errors and improve code quality during development.

/* `dotenv.config();` is a function call that loads environment variables from a `.env` file into
`process.env`. This allows the application to access configuration settings such as database URLs,
API keys, and other sensitive information without hardcoding them in the code. It helps keep
sensitive information secure and separate from the codebase. */
dotenv.config();

/* this CORS configuration is used to enable the backend server to accept requests from a frontend application that is hosted on a different origin (domain, protocol, or port).*/
app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,

}));

//to get the cookies from frontend 
app.use(cookieParser());

//what are pre and post middlewares in mongooose?
Pre middlewares are executed before the operation is performed. They can be used to validate data, transform data, or perform any other necessary tasks before the operation is executed. 
used for Hashing passwords before saving user documents.
import { genSalt,hash } from 'bcrypt';
userSchema.pre('save', async  function(next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});


Post middlewares are executed after the operation is performed. They can be used to perform any necessary tasks
use Cases: Post middleware can be useful for:
Performing actions after a document has been saved, such as sending a confirmation email.
Logging actions that have taken place after a database operation.
Cleaning up or modifying related data after an operation.

-create userModel
-create a auth route for signUp
-create a authController for signUp

create a auth route for login
-create a authController for login

-install axios
what is axios?
axios is a promise-based HTTP client for the browser and node.js. It's a popular choice for
making HTTP requests in JavaScript applications. Axios provides a simple and intuitive API for
making requests, and it supports features like automatic JSON data serialization and deserialization,
cancellation, and more.

it is used to connect frontend  and backend and  to send data from frontend to backend and vice versa
axios is used to make HTTP requests to the server, it can be used to make GET, POST
PUT, DELETE, PATCH requests.

-create api-client file in lib
import { HOST } from "@/utils/constants";
import axios from "axios";

const apiClient = axios.create({
    baseURL:HOST,
})

export default apiClient;

//Handle Signup and Login

 const handleSingUp = async ()=> {
        if(validateSignup()){
            const response = await apiClient.post(SIGNUP_ROUTE, {email, password},{withCredentials:true});
            console.log({response});

            if(response.status === 201){
                navigate("/profile")
            }
           
            }


    };

  const handleLogin = async () => {
        if(validateLogin()){
            try {
                const response = await apiClient.post(LOGIN_ROUTE, {email, password}, {withCredentials:true});
                
                if(response.data.user.id){
                    navigate(response.data.user.profileSetup ? "/chat" : "/profile");
                } else {
                    toast.error("Login failed. Please check your credentials.");
                }
            } catch (error) {
                // console.error( error);
                toast.error(error.response?.data || "An error occurred during login");
            }
        }
    }


# client

# Zustand
install zustand
Zustand is a state management library for React. It is used to manage global state in a
React application. It is a simple and lightweight library that allows you to manage state
in a predictable and efficient way.

-create userSlice

when refressing  the page, the state is lost. To persist the state, whenever we reload page or component is loaded initially  we fetch the data from server ,we send the jwt token if token is valid , we get the user data from server and update the state.
-----------------------------------
-allowing chat and profile  component to authenticated user if user not authenicated navigate to auth page 

const PrivateRoute = ({element}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? element : <Navigate to="/auth" />
}

const AuthRoute = ({element}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : element;
}








