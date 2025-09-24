import {Html5Qrcode, type CameraDevice} from 'html5-qrcode'
import {useCallback, useState} from 'react'

interface IFetchCameras {
  loading: boolean
  error?: Error
  cameraDevices: CameraDevice[]
}
const defaultState: IFetchCameras = {
  loading: false,
  cameraDevices: []
}

export const useFetchCameras = () => {
  const [state, setState] = useState<IFetchCameras>(defaultState)
  const fetchCameras = useCallback(async () => {
    try {
      if (!state.loading) {
        setState((prevState) => ({...prevState, loading: true}))
        const result = await Html5Qrcode.getCameras()
        setState({
          loading: false,
          cameraDevices: result
        })
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Not permitted';
      setState({
        loading: false,
        error: new Error(errorMessage),
        cameraDevices: []
      });
    }
  }, [state.loading])

  return {state, fetchCameras}
}
