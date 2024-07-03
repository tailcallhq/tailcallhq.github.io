import { Article } from "./article";

export default interface Publisher {
  publish(article: Article): void;
}
