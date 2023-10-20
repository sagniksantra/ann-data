import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";


export default function DropDown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: '#F5EEC8',
                    padding: 0,
                }}
            >
                Services
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Link to="/upload">
                    <MenuItem onClick={handleClose}>Disease Detection</MenuItem>
                </Link>
                <Link to="/soil">
                    <MenuItem onClick={handleClose}>Crop Recommendation - Soil</MenuItem>
                </Link>
                <Link to="/soil1">
                    <MenuItem onClick={handleClose}>Crop Recommendation - Region</MenuItem>
                </Link>
            </Menu>
        </div>
    );
}
