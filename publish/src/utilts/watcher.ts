import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import { publishPost, updatePost, removePost }from './hasnode';
import { processBlog, BlogData } from './processBlog';

// Path to the blog folder
const BLOG_FOLDER = path.join(__dirname, '../../blogs');

// File to track blog posts
const BLOG_TRACKER_FILE = path.join(__dirname, 'blogTracker.json');

interface BlogTracker {
  [fileName: string]: string; // maps file names to post IDs
}

// Load the blog tracker JSON file
const loadBlogTracker = (): BlogTracker => {
  if (fs.existsSync(BLOG_TRACKER_FILE)) {
    const fileContent = fs.readFileSync(BLOG_TRACKER_FILE, 'utf8');
    return JSON.parse(fileContent);
  }
  return {};
};

// Save the blog tracker JSON file
const saveBlogTracker = (tracker: BlogTracker) => {
  fs.writeFileSync(BLOG_TRACKER_FILE, JSON.stringify(tracker, null, 2), 'utf8');
};

// Initialize blog tracker
let blogTracker = loadBlogTracker();

// Watch the blog folder for changes
const watcher = chokidar.watch(BLOG_FOLDER, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

watcher
  .on('add', async (filePath) => {
    console.log(`File ${filePath} has been added`);
    const blogData = processBlog(filePath);
    const newPost = await publishPost(blogData);
    blogTracker[path.basename(filePath)] = newPost.id;
    saveBlogTracker(blogTracker);
    console.log('Published new post:', newPost);
  })
  .on('change', async (filePath) => {
    console.log(`File ${filePath} has been changed`);
    const blogData = processBlog(filePath);
    const postId = blogTracker[path.basename(filePath)];
    if (postId) {
      const updatedPost = await updatePost(postId, blogData);
      console.log('Updated post:', updatedPost);
    } else {
      console.warn(`No post ID found for ${filePath}. It may be a new post.`);
    }
  })
  .on('unlink', async (filePath) => {
    console.log(`File ${filePath} has been removed`);
    const postId = blogTracker[path.basename(filePath)];
    if (postId) {
      const removedPost = await removePost(postId);
      delete blogTracker[path.basename(filePath)];
      saveBlogTracker(blogTracker);
      console.log('Removed post:', removedPost);
    } else {
      console.warn(`No post ID found for ${filePath}. It may have been unpublished already.`);
    }
  });

console.log(`Watching for changes in ${BLOG_FOLDER}`);
