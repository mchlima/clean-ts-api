import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (document: any): any {
    const { _id, ...documentWithoutId } = document
    return {
      id: _id.toString(),
      ...documentWithoutId
    }
  }
}
