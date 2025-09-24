import Button from "@mui/material/Button";
import SendFilled from "@mui/icons-material/Send";
import QRCode2Icon from "@mui/icons-material/QrCode2";
import './qrCodeNumber.css';
import { useState } from "react";
import { Alert } from "@mui/material";

interface QrCodeNumberProps {
  qrCodeNumber: string,
  setQrCodeNumber: (code: string | null) => void
}


export const QrCodeNumber: React.FC<QrCodeNumberProps> = ({ qrCodeNumber, setQrCodeNumber }) => {

    const [showAlert, setShowAlert] = useState(false);

    const handleSend = () => {
        setShowAlert(true);
        setTimeout(() => {
        setShowAlert(false);
        }, 1500); // 1.5 segundos
    };


    const handleCopyClick = async (code: string) => {
            try {
            await navigator.clipboard.writeText(code);
            } catch (err) {
            console.error('Failed to copy text: ', err);
            }
        };

    const regexQrCodeNumber = (code: string) => {
        const regex = /(\d{44})/
        const codeNumber = regex.exec(code)?.[0];
        return codeNumber?.match(/.{1,4}/g) || [];
    }

    return <div className="qr-code-number">
        <div className='numbers-grid'>{regexQrCodeNumber(qrCodeNumber).map((num, index) => (<div key={index}>{num}</div>))}</div>
        <div className='qr-code-number-buttons'>
            <Button size="medium" endIcon={<SendFilled />} variant="contained" color="primary" onClick={() => {
                handleCopyClick(regexQrCodeNumber(qrCodeNumber).join(' '));
                handleSend();
            }}>SEND</Button>
            <Button size="medium" endIcon={<QRCode2Icon />} variant="contained" color="primary" onClick={() => {
                setQrCodeNumber(null);
            }}>SCAN</Button>
        </div>
        <div className="qr-code-number-alert">
            {showAlert && <Alert severity="info">Copied to transfer area!</Alert>}
        </div>
    </div>
}