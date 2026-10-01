
import { useEffect } from "react";
import { useState } from "react";

export default function Videos(){
    const[video,setVideo]=useState()
    const[loading,setLoading]=useState([])
    const[query,setQuery]=useState("")


    useEffect(()=>{
        if(!query){
            setVideo([])
        return;

        }

        const searchVideos=async()=>{
            try{
                setLoading(true)
                const response=await fetch(`/api/search?q=${encodeURI(query)}`)
                const data=await response.json()
                setVideo(data.results||[])
            }catch(error){
console.error("error")
            }finally{
                setLoading(false)
            }
        

        }

        searchVideos();
    },[query])
            
    
    return (
                <main className="min-h-screen bg-white px-6 py-16">
                  <div className="mx-auto max-w-7xl">
                    <div className="mb-10">
                      <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
                        Zova Music
                      </p>
            
                      <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
                        Music Videos
                      </h1>
            
                      <p className="mt-4 max-w-2xl text-gray-500">
                        Search and discover music videos from YouTube.
                      </p>
                    </div>
            
                    <div className="max-w-3xl">
                      <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search Afghan songs, artists, or music videos..."
                        className="w-full rounded-2xl border border-amber-500/20 bg-white px-5 py-4 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                      />
                    </div>
            
                    {loading && (
                      <p className="mt-10 text-center text-gray-500">
                        Searching YouTube...
                      </p>
                    )}
            
                    {!loading && query && videos.length === 0 && (
                      <p className="mt-10 text-center text-gray-500">
                        No videos found.
                      </p>
                    )}
            
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {videos.map((video) => (
                        <a
                          key={video.id}
                          href={`https://www.youtube.com/watch?v=${video.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-xl"
                        >
                          <div className="relative aspect-video overflow-hidden bg-amber-50">
                            <img
                              src={video.image}
                              alt={video.title}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
            
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white opacity-0 shadow-xl transition group-hover:opacity-100">
                                ▶
                              </span>
                            </div>
                          </div>
            
                          <div className="p-5">
                            <h2 className="line-clamp-2 font-semibold text-gray-900">
                              {video.title}
                            </h2>
            
                            <p className="mt-2 truncate text-sm text-gray-500">
                              {video.artist}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </main>
              );
            
                      }  