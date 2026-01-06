import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export default function LearningCard({
    title,
    desc,
    icon: Icon,
    color,
    link
} : {
    title : string,
    desc : string,
    icon : any,
    color : string,
    link : string
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className={`${color} rounded-full w-fit p-3`}>
                <Icon />
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
            </div>

            <div>
                <Link className="flex justify-between text-sm hover:bg-[#F9C505]/20 hover:text-foreground transition-all px-2 py-1 rounded-[2px] hover:scale-x-105" href={link}>
                    Explore Path
                    <ArrowRightIcon size={18}/>
                </Link>
            </div>
        </div>
    )
}