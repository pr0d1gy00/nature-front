import React from 'react'
import {Comment} from "@/hooks/store/useStore";
import Image, {StaticImageData} from "next/image";
import {UserCircleIcon} from "@heroicons/react/24/solid";

interface CommentProductStoreProps{
    comment:Comment
    configCalifications: {
        value: number
        label: string
        image: StaticImageData
        bgColor: string
        border: string
    }[]
}
export default function CommentProductStore({comment, configCalifications}:CommentProductStoreProps) {
    return (
        <div
            key={comment.id}
            className="shadow-sm rounded-xl p-6 relative"
        >
            <div className="flex items-center mb-4">
                <UserCircleIcon className="h-12 w-12 text-gray-400 mr-4"/>
                <div>
                    <p className="font-bold text-lg text-gray-800">
                        {comment.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                        Publicado:{" "}
                        {new Date(
                            comment.created_at
                        ).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div
                className={`mb-4 mt-2 w-[130px] px-4 py-2 rounded-lg flex items-center gap-2 ${
                    comment.calification.id
                        ? `${
                            configCalifications.find(
                                (
                                    cal
                                ) =>
                                    cal.value ===
                                    comment.calification.value
                            )
                                ?.border
                        }`
                        : ""
                } `}
            >
                <Image
                    src={
                        configCalifications.find(
                            (cal) =>
                                cal.value ===
                                comment.calification.value
                        )?.image || ""
                    }
                    alt=""
                    width={30}
                    height={30}
                />
                <p className="text-gray-600">
                    {configCalifications.find(
                            (cal) =>
                                cal.value ===
                                comment.calification.value
                        )?.label ||
                        ""}
                </p>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
                {comment.content}
            </p>
        </div>
    )
}
