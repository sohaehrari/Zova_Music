export async function GET(request){
    const {searchParams}=new URL(request.url)

    const query=searchParams.get("q")
    if(!q){
        return NextResponse.Json({
            results:[],
        })
    }


    const results=[
        {
            id:"1",
            title:"Afgahn Melody",
            artist:"one",
            image:"/images/music-2.jpg"
        },


        {
            id:"2",
            title:"Golden Night",
            artist:"Artist two",
            image:"/images/music-2.jpg"
        },
    
    ]

    const filterResult=results.filter((song)=>song.title.toLowerCase().includes(query,toLowerCase())||
    song.artist.toLowerCase().includes(query,toLowerCase())
    )
    return NextResponse.Json({results:filterResult,
    
    })
}