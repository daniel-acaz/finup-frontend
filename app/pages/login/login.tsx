import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import Checkbox from "@mui/material/Checkbox";
import { Button, TextField } from "@mui/material";
import "./login.css";

export default function Login() {
    
    return <div>
        <div className="logo">
            <img src="/public/primary-logo.png" alt="Finup Logo"></img>
        </div>
        <div className="login-inputs">
            <TextField label="Email" variant="outlined" />
            <TextField label="Password" type="password" variant="outlined" />
        </div>
        <div className="login-actions">
            <div className="checkbox">
            <Checkbox />
            <p>Remember Me</p>
            </div>
            <p>Forgot Password?</p>
        </div>
        <div className="login-buttons">
            <Button className="login-standard" variant="contained">LOGIN</Button>
            <p>Or login with</p>
            <Button variant="outlined" color="inherit" startIcon={<GoogleIcon color="error" />} fullWidth={true}>Login with Google</Button>
            <Button variant="outlined" color="inherit" startIcon={<AppleIcon />}>Login with Apple</Button>
            <Button variant="outlined" color="inherit" startIcon={<MicrosoftIcon color="primary" />}>Login with Microsoft</Button>
        </div>
    </div>; 
}