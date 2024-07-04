import {Article} from "./article"

export default interface Publisher {
  publishDraft(article: Article): Promise<void>
  // gives back the content id
  publish(article: Article): Promise<string>
  edit(id: string, article: Article): Promise<void>
  // takes a matter data key-value pair and finds the publisher content id in the markdown header
  getContentId(matter_data: {[key: string]: any}): string
  // takes a matter data key-value pair and returns a matter key-value pair with the content id
  addContentId(matter_data: {[key: string]: any}, id: string): {[key: string]: any}
}
