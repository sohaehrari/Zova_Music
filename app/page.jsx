import Hero from "@/components/home/Hero"
import FeaturedSongs from "@/components/home/FeaturedSongs"
import PopularArtists from "@/components/home/PopularArtists"
import LatestVideos from "@/components/home/LatestVideos"



export default function Home(){
  return(
    <main>
      <Hero/>
      <FeaturedSongs/>
      <PopularArtists/>
    <LatestVideos/>
    </main>
  )
}