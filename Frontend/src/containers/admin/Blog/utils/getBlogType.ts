import {BlogTypes, IBlogItem} from "../../../../api/blog";

export const isArticle = (blog ?: IBlogItem) => (blog && blog.type === BlogTypes.ARTICLE) || false;

export const isStory = (blog ?: IBlogItem) => (blog && blog.type === BlogTypes.STORY) || false;

