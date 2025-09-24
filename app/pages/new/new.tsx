import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';
import './new.css';
import { useFetchCameras } from '~/shared/useFetchCameras';
import { QrCodeNumber } from '~/components/qrCodeNumber/qrCodeNumber';

interface IInfoProps {
  title: string
}

export const Info: React.FC<IInfoProps> = ({title}: IInfoProps) => (
  <div>
    <h6>{title}</h6>
  </div>
)

enum PluginState {
  Initial = 'initial',
  Starting = 'starting',
  Started = 'started',
  StartingFailed = 'startingFailed',
  StoppingFailed = 'stoppingFailed'
}

const itQrCodeErrorCallback = (errorMessage: string) => {
  
}

const qrcodeRegionId = "html5qr-code-full-region";

export default function New() {

  const {fetchCameras, state: {loading, error, cameraDevices}} = useFetchCameras();
  const [selectedCameraId] = useState<string | undefined>(undefined);
  const html5Qrcode = useRef<null | Html5Qrcode>(null);
  const pluginStateRef = useRef<PluginState>(PluginState.Initial);
  const qrCodeRegionRef = useRef<HTMLDivElement | null>(null);
  const [isScannerReady, setIsScannerReady] = useState(false);
  const [qrCodeNumber, setQrCodeNumber] = useState<string | null>(null);
  let cameraId: string | undefined

  const itQrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
    setQrCodeNumber(decodedText);
    console.log(`Code matched = ${qrCodeNumber}`, decodedResult);
  }

  const config = { fps: 4, qrbox: { width: 250, height: 200 }, disableFlip: false, qrCodeSuccessCallback: itQrCodeSuccessCallback, itQrCodeErrorCallback, aspectRatio: 1.333334	 };

  useEffect(() => {
    fetchCameras();
  }, []);

  useEffect(() => {
    if (!isScannerReady) return;
    html5Qrcode.current ??= new Html5Qrcode(qrcodeRegionId);
    const prevQrcodeRegionId = qrcodeRegionId;
    return () => {
      if (html5Qrcode.current && prevQrcodeRegionId !== qrcodeRegionId) {
        // stopping due changed qrcodeRegionId
        html5Qrcode.current?.stop()
          .then(() => {
            // camera stopped
          })
          .catch(() => {
            // camera failed to stop
          });
      }
    };
  }, [isScannerReady, qrcodeRegionId]);

  useEffect(() => {
    console.log('USE EFFECT 3: Starting camera');
    cameraId = selectedCameraId || cameraDevices[0]?.id;
    if (!isScannerReady) return;
    
    if (
      html5Qrcode.current &&
      pluginStateRef.current !== PluginState.Starting &&
      cameraId !== undefined &&
      qrCodeNumber === null
    ) {
      pluginStateRef.current = PluginState.Starting;
      html5Qrcode.current
        .start(cameraId, config, config.qrCodeSuccessCallback, config.itQrCodeErrorCallback)
        .then(() => {
          pluginStateRef.current = PluginState.Started;
        })
        .catch(() => {
          pluginStateRef.current = PluginState.StartingFailed;
        });
    }
    return () => {
      console.log('USE EFFECT 3 CALLBACK: Stop camera');
      if (html5Qrcode.current && html5Qrcode.current.getState() != Html5QrcodeScannerState.NOT_STARTED && pluginStateRef.current !== PluginState.Starting) {
        html5Qrcode.current
          ?.stop()
          .then(() => {
            pluginStateRef.current = PluginState.Initial;
          })
          .catch(() => {
            pluginStateRef.current = PluginState.StoppingFailed;
          });
      }
    };
  }, [isScannerReady, config.qrCodeSuccessCallback]);


  useEffect(() => {
    if( cameraDevices.length === 0 ) return;
    setIsScannerReady(true);
  }, [cameraDevices]);

  if (loading) {
    return <Info title="Detecting available cameras"/>
  }
  if (error) {
    return <Info title="Failed to detect cameras"/>
  }
  if (cameraDevices.length === 0) {
    return <Info title="No available cameras"/>
  }

  return (
    <main className='qr-code-scanner-content'>
      <div className='content'>
        <h1 className='title'>
          Scan QR Code
        </h1>
        <p className='header'> {qrCodeNumber ? "QR Code Scanned": "Scan the invoice QR code to add its"}</p>
        {qrCodeNumber? <QrCodeNumber qrCodeNumber={qrCodeNumber} setQrCodeNumber={setQrCodeNumber} /> : <div className='qr-code-scanner' id={qrcodeRegionId} ref={qrCodeRegionRef} />}
      </div>
    </main>
  );
}
