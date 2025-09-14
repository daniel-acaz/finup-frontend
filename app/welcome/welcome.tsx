import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import './welcome.css';

const qrcodeRegionId = "html5qr-code-full-region";

const itQrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
  console.log(`Code matched = ${decodedText}`, decodedResult);
}

const itQrCodeErrorCallback = (errorMessage: string) => {
  
}

const config = { fps: 10, qrbox: { width: 250, height: 250 }, disableFlip: false, qrCodeSuccessCallback: itQrCodeSuccessCallback, itQrCodeErrorCallback };

export function Welcome() {

  useEffect(() => {
    const verbose = false;

    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(config.qrCodeSuccessCallback, config.itQrCodeErrorCallback);

    return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
  }, []);

  return (
    <main className='qr-code-scanner-content'>
      <div className='content'>
        <h1 className='title'>
          Scan QR Code
        </h1>
        <p className='header'> Scan the invoice QR code to add its</p>
        <div className='qr-code-scanner' id={qrcodeRegionId} style={{ width: "300px" }}></div>
      </div>
    </main>
  );
}
