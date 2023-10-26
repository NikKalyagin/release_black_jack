'use client'
import App from "./App"

export default function Home() {
  function isBrowser() {
    return typeof window !== 'undefined';
  }
  
  if (isBrowser()) {
    console.log("Этот код выполняется в браузере");
  } else {
    console.log("Этот код выполняется на сервере или в другой среде, где нет объекта window");
  }
  return (
    
    <App />
  )
}
