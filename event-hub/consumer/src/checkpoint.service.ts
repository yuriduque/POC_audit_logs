import { Injectable } from '@nestjs/common';
import { BlobCheckpointStore } from '@azure/eventhubs-checkpointstore-blob';
import { ContainerClient } from '@azure/storage-blob';

@Injectable()
export class CheckpointStoreService {
  private readonly storageAccountConnectionString =
    process.env.CHECKPOINT_STORE_CONNECTION_STRING || '';
  private readonly containerName =
    process.env.CHECKPOINT_STORE_CONTAINER_NAME || '';

  async create() {
    try {
      const blobContainerClient = new ContainerClient(
        this.storageAccountConnectionString,
        this.containerName,
      );

      if (!(await blobContainerClient.exists())) {
        await blobContainerClient.create();
      }

      const checkpointStore = new BlobCheckpointStore(blobContainerClient);
      return checkpointStore;
    } catch (error) {
      console.error('Failed to create BlobCheckpointStore:', error);
      throw error;
    }
  }
}
