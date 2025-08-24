import React from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { Toaster } from 'react-hot-toast';

interface Column{
	key: string;
	label: string;
	className?: string;
}

interface DatableProps {
	columns: Column[];
	data: Record<string, string | number >[];
	renderRow?: (row: Record<string, string | number>, idx: number) => React.ReactNode;
}

interface DatatableProps extends DatableProps {
    setSelectedEdit: React.Dispatch<React.SetStateAction<string | null>>;
    setSelectedDelete: React.Dispatch<React.SetStateAction<string | null>>;
}


export default function Datatable({setSelectedEdit,setSelectedDelete,columns,data,renderRow}:DatatableProps) {

	const gridColsClass:Record<number,string>={
		1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
	}

	const colsClass = gridColsClass[columns.length] || 'grid-cols-1';

	const deleteAction = (id: string) => {
        setSelectedDelete(id);
    };
    const updateAction = (id:string) => {
        setSelectedEdit(id);
    };


	return (
        <div className="max-md:w-[100%] max-md:overflow-x-auto max-md:overflow-y-hidden flex h-auto w-full max-w-full flex-col">

			<div>
                <Toaster />
            </div>
            <div className="min-w-[800px]">
                {/* Header */}
                <div className={`grid ${colsClass} gap-2 border-b bg-white px-2 py-2 font-semibold`}>
                    {
                        columns.map((col) => (
                            <div key={col.key} className={col.className || ''}>
                                {col.label}
                            </div>
                        ))
                    }
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                <SwipeableList threshold={0.4}>
                    {(!data || data.length === 0) ?
                        <div className="flex h-16 w-full justify-center items-center text-gray-500 text-2xl">
                            <h2>No hay datos disponibles</h2>
                        </div>
                    :data.map((row, idx) =>
                        renderRow ? (
                            renderRow(row, idx)
                        ) : (
                            <SwipeableListItem
                                threshold={0.4}
                                swipeLeft={{
                                    content: (
                                        <div className="flex h-16 w-full items-center justify-end rounded-sm bg-red-500 p-4 text-right font-bold text-white">
                                            <TrashIcon className="h-6 w-6 text-white" />
                                            Eliminar
                                        </div>
                                    ),
                                    action: () => deleteAction(String(row.id)),
                                }}
                                swipeRight={{
                                    content: (
                                        <div className="flex h-16 w-full items-center justify-start rounded-sm bg-blue-500 p-4 text-right font-bold text-white">
                                            <PencilSquareIcon className="h-6 w-6 text-white" />
                                            Actualizar
                                        </div>
                                    ),
                                    action: () => updateAction(String(row.id)),
                                }}
                                key={row.id}
                            >
                                <div
                                    key={idx}
                                    className={`grid ${colsClass} my-2 h-16 w-full items-center gap-2 overflow-x-auto rounded-xl bg-[#136F63] px-2 py-2 text-white`}
                                >
                                    {columns.map((col) => (
                                        <div key={col.key} className={'truncate max-sm:max-w-[150px]'}>
                                            {row[col.key]}
                                        </div>
                                    ))}
                                </div>
                            </SwipeableListItem>
                        ),
                    )}
                </SwipeableList>
                </div>
            </div>

		</div>
	)
}
