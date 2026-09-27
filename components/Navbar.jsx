import Link from "@/node_modules/next/link"

export default function Navbar(){
    const pages=[
        {name:"Search", href:"/search"},
        {name:"Artists", href:"/artists"},
        {name:"Songs", href:"/songs"},
        {name:"Videos", href:"/videos"},

    ]
    return(
   <nav>
    {pages.map((page)=>(
        <Link key={page.href}>
            <p>{page.name}</p>
            <p>{page.href}</p>


        </Link>
    ))}
   </nav> 
    )
}