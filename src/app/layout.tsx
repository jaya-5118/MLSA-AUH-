import "./globals.css";
import Script from "next/script";
import ChatbaseIdentify from "@/components/ChatbaseIdentify"; // only Chatbase component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Load Chatbase script */}
        <Script id="chatbase-script" strategy="afterInteractive">
          {`
            (function(){
              if(!window.chatbase || window.chatbase("getState")!=="initialized"){
                window.chatbase=(...args)=>{(window.chatbase.q=window.chatbase.q||[]).push(args)};
                window.chatbase=new Proxy(window.chatbase,{
                  get(t,p){return p==="q"?t.q:(...a)=>t(p,...a)}
                });
              }
              const s=document.createElement("script");
              s.src="https://www.chatbase.co/embed.min.js";
              s.id="1lb0cg8H2Au-ABB7MqQof";  // your Chatbase bot ID
              s.domain="www.chatbase.co";
              document.body.appendChild(s);
            })();
          `}
        </Script>
        <ChatbaseIdentify />
      </body>
    </html>
  );
}
