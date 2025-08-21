import { useQuery } from '@tanstack/react-query';
import { APIResponseTheDogAPI } from '@/interfaces/api.interface';
import { getBreedsAction } from '@/core/action';

const useBreed = () => {

    const knownBadImageIds = ['HkC31gcNm', 'B12uzg9V7', '_Qf9nfRzL'];

    const breedsQuery = useQuery<APIResponseTheDogAPI[]>({
        queryKey: ['breeds'],
        queryFn: async()=>{
            const breedData = await getBreedsAction();
            return breedData.filter(b=> !knownBadImageIds.includes(b.reference_image_id))
        },
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchOnWindowFocus: false, // prevents refetching
    });

    return {
        breedsQuery
    }
}

export default useBreed