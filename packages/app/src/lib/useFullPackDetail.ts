import {useEffect, useState} from "react";
import {fetchFullPackDetail, FullPackDetail} from "@/src/lib/fetchFullPackDetail";

export function useFullPackDetail({key}: {key: string}) {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<FullPackDetail>()
    const [isError, setIsError] = useState(false)
  console.log({key})
    useEffect(() => {
        if (!key) {
            return;
        }
        setIsLoading(true)
        fetchFullPackDetail({key}).then(result => {
           console.log(result)
            setData(result);
            setIsError(!result)
            setIsLoading(false);
        });
    }, [key]);

    return {data, isLoading, isError}
}
