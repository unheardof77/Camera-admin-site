
interface FileCardProp {
    filename: string;
    uniqueId: Key;
}

import Link from "next/link";
import { Key } from "react";

export default function FileCard({filename, uniqueId}:FileCardProp){

    return (
        <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition duration-300">
            <Link
                key={uniqueId}
                href={`/view/video/${filename}`}
                className="block text-blue-600 hover:underline font-medium text-lg truncate"
            >
                {filename}
            </Link>
        </div>
    )
}