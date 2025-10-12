import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Chatbot } from "@/components/chatbot"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MLSA - Microsoft Learn Student Ambassadors",
  description:
    "Join our vibrant tech community at Microsoft Learn Student Ambassadors. Learn, build, and grow together!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Chatbot /> {/* 👈 Optional: Keep your custom chatbot if you still want it */}

        {/* 👇 Add your Chatbase embed script here */}
        <Script id="chatbase-embed" strategy="afterInteractive">
          {`(function(){
            if(!window.chatbase || window.chatbase("getState")!=="initialized"){
              window.chatbase=(...arguments)=>{
                if(!window.chatbase.q){window.chatbase.q=[]}
                window.chatbase.q.push(arguments)
              };
              window.chatbase=new Proxy(window.chatbase,{
                get(target,prop){
                  if(prop==="q"){return target.q}
                  return(...args)=>target(prop,...args)
                }
              })
            }
            const onLoad=function(){
              const script=document.createElement("script");
              script.src="https://www.chatbase.co/embed.min.js";
              script.id="X-gb7E74EMkjbN5rIAk9h"; // ✅ Your Chatbase ID
              script.dataset.domain="www.chatbase.co";
              document.body.appendChild(script)
            };
            if(document.readyState==="complete"){onLoad()}
            else{window.addEventListener("load",onLoad)}
          })();`}
        </Script>
      </body>
    </html>
  )
}
