import {Article} from "./article"

export default interface Publisher {
  publishDraft(article: Article): Promise<void>
  publish(article: Article): Promise<string>
  edit(id: string, article: Article): Promise<void>
  getContentId(matter_data: {[key: string]: any}): string
  addContentId(matter_data: {[key: string]: any}, id: string): {[key: string]: any}
}
