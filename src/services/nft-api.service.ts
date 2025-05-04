import {NFTType} from "@/enums/collectibles";

export interface NFTApiResponse {
    id: number;
    floor: number;
}


export class NFTApiService {
    private readonly baseUrl: string;
    private readonly authToken: string;

    constructor() {
        if (!process.env.SFL_API_BASE_URL) throw new Error('SFL_API_BASE_URL is not defined');
        if (!process.env.SFL_API_TOKEN) throw new Error('SFL_API_TOKEN is not defined');

        this.baseUrl = process.env.SFL_API_BASE_URL;
        this.authToken = process.env.SFL_API_TOKEN;
    }


    async fetchNFTData(nftId: NFTType): Promise<NFTApiResponse> {
        try {
            const response = await fetch(
                `${this.baseUrl}/collection/collectibles/${nftId}?type=collectibles`,
                {
                    headers: {
                        Authorization: `Bearer ${this.authToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error fetching NFT data for ID ${nftId}:`, error);
            throw error;
        }
    }

    async fetchAllNFTs(): Promise<NFTApiResponse[]> {
        const nftIds = Object.values(NFTType).filter(value => typeof value === 'number');
        const promises = nftIds.map(id => this.fetchNFTData(id as NFTType));
        return Promise.all(promises);
    }
}
