import { Inter } from 'next/font/google'
import './globals.css'
// import ShopSwitcher from '@/components/shop-switcher'
import MainNav from '@/components/main-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="border-b fixed w-full backdrop-blur-md z-10">
          <div className="flex h-16 items-center px-4">
            {/* <ShopSwitcher /> */}
            <MainNav className="mx-6" />
            
          </div>
        </div>

        <div className='pt-12'>

        {children}
        </div>
        
        </body>
    </html>
  )
}