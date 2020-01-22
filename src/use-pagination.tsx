import React, {useEffect, useState} from 'react';

export function usePagination<Type>(data: Array<Type>, pageSize: number) {
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState<Type[]>();
    const [totalPages, setTotalPages] = useState(0);
    const total = data.length;
    const offsetStart = (page - 1) * pageSize;
    const offsetEnd = offsetStart * pageSize;

    useEffect(() => setTotalPages(Math.ceil(total / pageSize)), [data]);
    useEffect(() => setPageData(data.slice(offsetStart, offsetEnd)), [page]);

    const pagination =
        new Array(totalPages).fill(null).map((_, idx) => {
            return <button key={idx} onClick={() => setPage(idx + 1)}>{idx + 1}</button>
        });
    return {
        page,
        setPage,
        pageData,
        totalPages,
        pagination,
        pageSize
    }
}