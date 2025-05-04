import { NFTApiService } from './nft-api.service';
import {PrismaClient} from "@prisma/client";


export class NFTPriceService {
  private readonly nftApiService: NFTApiService;
  private readonly prisma: PrismaClient;


  constructor() {
    this.nftApiService = new NFTApiService();
    this.prisma = new PrismaClient()
  }

  async processNFTData(): Promise<void> {
    try {
      const nftData = await this.nftApiService.fetchAllNFTs();

      await Promise.all(
        nftData.map(nft =>
            this.prisma.nftPrice.create({
            data: {
              nftId: nft.id,
              price: Number(nft.floor.toFixed(7)),
              date: new Date(),
            },
          })
        )
      );
    } catch (error) {
      console.error('Error processing NFT data:', error);
      throw error;
    }
  }
}
