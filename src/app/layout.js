import './globals.css'
import { Inter, Oi } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const oi = Oi({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}