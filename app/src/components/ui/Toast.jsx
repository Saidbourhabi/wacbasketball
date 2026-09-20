import { Toaster } from 'react-hot-toast'

export default function Toast() {
return (
    <Toaster
        position="bottom-right"
        toastOptions={{
        duration: 1800,
        style: {
        background: '#FC0000',
        color: '#ffffff',
        border: '2px solid #ffffff',
        },
    }}
    />
)
}