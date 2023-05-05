import '@/styles/globals.css'
import { ConfigProvider } from "antd";
import {UserContextProvider} from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
    
    
  return (
      <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#00b96b',
            },
          }}
      >
          <UserContextProvider>
              <Component {...pageProps} />
          </UserContextProvider>
      </ConfigProvider>
  )
}
