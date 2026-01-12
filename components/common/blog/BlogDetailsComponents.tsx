
"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function BlogDetailsComponents() {

    const { slug } = useParams();

    useEffect( () => {
        const fetchData = async () => {
            try{
                const response = await fetch(`/api/blog/${slug}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const data = await response.json();

                console.log(data);
            }
            catch(error){
                console.error("Error fetching data:", error);
            }
        }

        fetchData()
    }, [slug]);

    return (
        <div>
            Blog Details Page
        </div>
    )
}