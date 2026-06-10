import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'

const LiveSite = () => {

    const [html, setHtml] = useState("");
    const [error, setError] = useState('');

    const { id } = useParams();

    useEffect(() => {

        const handleGetWebsite = async () => {
            try {

                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/getbyslug/${id}`, { withCredentials: true })

                setHtml(res.data.website.latestCode)

            } catch (error) {
                setError(error.response.data.message || 'Failed to fetch website')
            }
        }
        handleGetWebsite();



    }, [id])


    if(error){
        return  (
            <div className="h-screen flex items-center justify-center bg-black text-white "> {error}</div>
        )
    }

    return (
        <iframe title="Live Site" srcDoc={html} className="w-full h-screen border-none" sandbox="allow-scripts allow-forms"/>
    )
}

export default LiveSite