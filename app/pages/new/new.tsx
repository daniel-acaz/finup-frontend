import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';
import './new.css';
import { useFetchCameras } from '~/shared/useFetchCameras';

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

const itQrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
  console.log(`Code matched = ${decodedText}`, decodedResult);
  handleCopyClick(decodedText);
}

const handleCopyClick = async (code: string) => {
        try {
          await navigator.clipboard.writeText(code);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      };

const itQrCodeErrorCallback = (errorMessage: string) => {
  
}

const config = { fps: 4, qrbox: { width: 250, height: 200 }, disableFlip: false, qrCodeSuccessCallback: itQrCodeSuccessCallback, itQrCodeErrorCallback, aspectRatio: 1.333334	 };

const qrcodeRegionId = "html5qr-code-full-region";

export default function New() {

  const {fetchCameras, state: {loading, error, cameraDevices}} = useFetchCameras();
  const [selectedCameraId] = useState<string | undefined>(undefined);
  const html5Qrcode = useRef<null | Html5Qrcode>(null);
  const pluginStateRef = useRef<PluginState>(PluginState.Initial);
  const qrCodeRegionRef = useRef<HTMLDivElement | null>(null);
  const [isScannerReady, setIsScannerReady] = useState(false);
  let cameraId: string | undefined

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
    cameraId = selectedCameraId || cameraDevices[0]?.id;
    if (!isScannerReady) return;
    
    if (
      html5Qrcode.current &&
      pluginStateRef.current !== PluginState.Starting &&
      cameraId !== undefined
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
      if (html5Qrcode.current && pluginStateRef.current !== PluginState.Starting) {
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
        <p className='header'> Scan the invoice QR code to add its</p>
        <div className='qr-code-scanner' id={qrcodeRegionId} ref={qrCodeRegionRef} />
      </div>
    </main>
  );
}
