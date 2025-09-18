import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import ListIcon from "@mui/icons-material/List";
import QRCode2Icon from "@mui/icons-material/QRCode2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { useNavigate } from "react-router";

const pages: Record<number, string> = {
      0: "/invoices",
      1: "/",
      2: "/account"
}

export const NavBar = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation className="navbar" showLabels={true} value={value} onChange={(event, newValue) => {
                  navigate(pages[newValue]);
            setValue(newValue);
            }}>
                  <BottomNavigationAction className="navbar-action" label="Invoices" icon={<ListIcon />} />
                  <BottomNavigationAction className="navbar-action" label="New" icon={<QRCode2Icon />} />
                  <BottomNavigationAction className="navbar-action" label="Account" icon={<AccountCircleIcon />} />
            </BottomNavigation> 
          </Paper>
}