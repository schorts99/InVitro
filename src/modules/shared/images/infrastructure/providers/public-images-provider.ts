export default class PublicImagesProvider {
  async getUrl(name: string, _: string): Promise<string> {
    return `/${name}`;
  }
}
