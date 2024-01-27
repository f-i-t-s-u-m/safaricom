import { Inter } from 'next/font/google'
import './globals.css'
// import ShopSwitcher from '@/components/shop-switcher'
import MainNav from '@/components/main-nav'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  metadataBase: new URL('https://safaricom.vercel.app'),
  title: 'Bluespark sales report ',
  description: 'Your trusted partner for technology solutions ',
  siteName: 'Bluespark sales report webapp',
  generator:"",
  locale: 'en_US',
  type: 'website',
  authors: [{name: 'fitsum belay', url: 'https://www.linkedin.com/in/f-i-t-s-u-m'}, {name: 'chernet'}],
  creator: 'Fitsum Belay',
  publisher: 'Fitsum Belay',
  openGraph: {
    images: '/logo.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="border-b fixed w-full backdrop-blur-md bg-white bg-opacity-70 z-10">
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
