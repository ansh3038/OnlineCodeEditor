import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/sessionProvider";
import NavBar from "./components/navbar";
import 'core-js/stable';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <div style={{ height: '90vh', display: 'flex', flexDirection: 'column',overflow: 'auto' }}> */}
      
        <SessionProvider session={session}>
          <NavBar />
          <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                      success: {
                        theme: {
                          primary: '#4aed88',
                        },
                      },
                    }}
                    ></Toaster>
            </div>


          {children}
          
        </SessionProvider>
                    {/* </div> */}
      </body>
    </html>
  );
}
