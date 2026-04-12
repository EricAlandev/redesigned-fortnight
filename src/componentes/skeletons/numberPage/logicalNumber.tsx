
import { ServiceAndData, services } from "@/types/TypeService";
import { useEffect, useState } from "react";

export default function useLogicalNumber(servicesArray: ServiceAndData[] | services[]){

    const [servicesPerPage, setServicesPerPage] = useState<number>(2);
    const [actualPageNumber, setActualPageNumber] = useState(1);

    const services = servicesArray || []

    //logical of renderizing of pages
    const pages = Math.ceil(services.length / servicesPerPage);
    const arrayNumberPages: number[] = [];
    
    for(let i = 0; i < pages; i++){
        arrayNumberPages.push(i + 1);
    }

    const startIndex = (actualPageNumber - 1) * servicesPerPage;
    const actualServices = services.slice(startIndex, startIndex + servicesPerPage);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // Desktop
                setServicesPerPage(6);
            } else if (window.innerWidth >= 768) { // Tablet
                setServicesPerPage(6);
            } else { // Mobile
                setServicesPerPage(1);
            }
        };
    
        // Run once on mount
        handleResize();

        handleResize();
        window.addEventListener('resize', handleResize);

        // ALWAYS return a function here. 
        // If you return nothing or a variable, you get the 'destroy' error.
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return{
        actualPage: actualPageNumber,
        quantityOfPages: pages,
        setActualPage: setActualPageNumber,
        arrayWithNumberPages: arrayNumberPages,
        actualServices: actualServices
    }
}