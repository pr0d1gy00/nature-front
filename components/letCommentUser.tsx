import React from 'react'
import {Califications} from "@/hooks/store/useStore";
import Image, {StaticImageData} from "next/image";
import {ParamValue} from "next/dist/server/request/params";

interface  LetCommentUserProps {
    califications: Califications[]
    handleCalificationClick: (value: number) => void
    configCalifications: {
        value: number
        label: string
        image: StaticImageData
        bgColor: string
        border: string
    }[]
    commentToSend: {
        calification_id: number
        product_id: ParamValue
        comment: string
    }
    selectedCalification: {
        value: number
        label: string
        image: StaticImageData
        bgColor: string
        border: string
    } | undefined
    handleChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLButtonElement>) => void
    handleSubmitComment: () => Promise<void>
}

export default function LetCommentUser({califications,handleCalificationClick,configCalifications,commentToSend,handleChangeComment,handleSubmitComment,selectedCalification}: LetCommentUserProps) {
    return (
        <div className="mt-4">
            <h4 className="text-xl font-semibold mb-2">
                Agregar un comentario
            </h4>
            <h4 className="text-gray-400">
                Deja tu calificación
            </h4>
            <div className="flex gap-2 mt-2 mb-4">
                {califications.map(
                    (calification, index) => (
                        <button
                            key={
                                calification.id
                            }
                            name="calification_id"
                            value={
                                calification.value
                            }
                            onClick={() =>
                                handleCalificationClick(
                                    calification.value
                                )
                            }
                            className={`flex items-center cursor-pointer gap-2 hover:shadow-lg	${
                                calification.label ==
                                configCalifications[
                                    index
                                    ].label
                                    ? `${configCalifications[index].bgColor}`
                                    : ""
                            } px-4 py-2 rounded-md`}
                        >
                            <Image
                                src={
                                    calification.label ==
                                    configCalifications[
                                        index
                                        ].label
                                        ? configCalifications[
                                            index
                                            ]
                                            .image
                                        : ""
                                }
                                alt=""
                                width={30}
                                height={30}
                            />
                            {
                                calification.label
                            }
                        </button>
                    )
                )}
            </div>
            {commentToSend.calification_id ? (
                <>
                    <h4 className="text-green-500 font-bold">
                        Calificación
                        Seleccionada
                    </h4>
                    <div
                        className={`mb-4 mt-2 w-[130px] px-4 py-2 rounded-lg flex items-center gap-2 ${
                            commentToSend.calification_id
                                ? `${
                                    configCalifications.find(
                                        (
                                            cal
                                        ) =>
                                            cal.value ===
                                            commentToSend.calification_id
                                    )
                                        ?.bgColor
                                }`
                                : ""
                        }`}
                    >
                        <Image
                            src={
                                configCalifications.find(
                                    (cal) =>
                                        cal.value ===
                                        commentToSend.calification_id
                                )?.image || ""
                            }
                            alt=""
                            width={30}
                            height={30}
                        />
                        <p className="text-gray-600">
                            {selectedCalification?.label ||
                                ""}
                        </p>
                    </div>
                </>
            ) : ''}
            <textarea
                onChange={handleChangeComment}
                className="w-full border border-gray-300 rounded-md p-2"
                rows={4}
                name="comment"
                value={commentToSend.comment}
                placeholder="Escribe tu comentario aquí..."
            ></textarea>
            <button onClick={handleSubmitComment}
                    className="mt-2 hover:shadow-lg cursor-pointer bg-green-500 text-white py-2 px-4 rounded-md">
                Enviar comentario
            </button>
        </div>
    )
}
