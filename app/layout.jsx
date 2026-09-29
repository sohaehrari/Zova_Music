import Navbar from "@/components/Navbar"
import "./globals.css";


export default function LayOut({children}){
  const metaData=[
    {title:"Zova_Afghan_Music",
  discription:"this is afghan music that you can find your favorite music"
  
  }
  
  ]
  
  return(
    <html>
      <body>
        <Navbar/>
<main>
  {children}
</main>
      </body>
    </html>
  )
}