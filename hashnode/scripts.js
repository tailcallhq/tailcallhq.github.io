/* eslint-disable @typescript-eslint/no-var-requires */
"use strict"
const axios = require("axios")
const path = require("path")
const fs = require("fs")
const matter = require("gray-matter")
const marked = require("marked")
const Promise = require("bluebird")
const _ = require("lodash")
const {execSync} = require("child_process")
const yargs = require("yargs/yargs")
const {hideBin} = require("yargs/helpers")
require("dotenv").config()

//Parse command-line arguments
const argv = yargs(hideBin(process.argv))
  .option("skipLastModifiedCheck", {
    alias: "s",
    type: "boolean",
    description: "Skip last modified check",
  })
  .option("fileName", {
    alias: "f",
    type: "string",
    description: "Name of the file",
    coerce: (arg) => {
      try {
        return JSON.parse(arg)
      } catch (e) {
        console.error("Invalid JSON format for fileName")
        return arg
      }
    },
  })
  .help().argv

const hashnodeApiKey = process.env.HASH_NODE_API_KEY || "" // Replace with your actual key
const blogPostsDir = path.join(__dirname, "../docs")
const apiEndpoint = process.env.HASH_NODE_ENDPOINT || "https://gql.hashnode.com/"
const publicationId = process.env.HASH_NODE_PUBLICATION_ID || ""
const githubBaseUrl = "https://raw.githubusercontent.com/tailcallhq/tailcallhq.github.io/develop/static/images/docs/"
const pathRegex = /\.\.\/static\/images\/docs\//g

function getLastModified(filePath) {
  try {
    // Get the last commit that modified the file
    const lastCommit = execSync(`git log -1 --format=%cd -- ${filePath}`, {cwd: blogPostsDir})
    return new Date(lastCommit.toString().trim())
  } catch (error) {
    console.error(`Error getting last modified date for ${filePath}: ${error.message}`)
    return null
  }
}
async function fetchUserPostBySlug(slug) {
  const outputParams = ["subtitle", "slug", "title", "url"]
  const randomField = outputParams[Math.floor(Math.random() * outputParams.length)]

  const query = `query FetchPostBySlug($publicationId: ObjectId!, $slug: String!) {
    publication(id: $publicationId) {
      isTeam
      title
      post(slug: $slug) {
        id
        title
        updatedAt
        content {
          markdown
        }
        ${randomField}
      }
    }
  }`

  const variables = {
    publicationId: publicationId,
    slug: slug,
  }

  try {
    const response = await axios.post(
      apiEndpoint,
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: hashnodeApiKey,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    )

    const publicationData = _.get(response, "data.data.publication", {})
    const post = _.get(publicationData, "post", null)
    return {
      success: true,
      post,
    }
  } catch (error) {
    console.error(`Error fetching post by slug: ${error.message}`)
    if (error.response && error.response.data) {
      console.error(JSON.stringify(error.response.data, null, 2))
    }
    return {
      success: false,
      post: null,
    }
  }
}

async function updatePost(input) {
  const query = `
    mutation UpdatePost($input: UpdatePostInput!) {
      updatePost(input: $input) {
        post {
          id
          slug
          title
        }
      }
    }
  `
  try {
    const response = await axios.post(
      `${apiEndpoint}?timeStamp=${Date.now()}`,
      {
        query,
        variables: {
          input,
        },
      },
      {
        headers: {
          Authorization: hashnodeApiKey,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    )

    if (_.get(response, "data.errors")) {
      console.error("Error updating the post:", response.data.errors)
    } else {
      return _.get(response, "data.data.updatePost.post", null)
    }
  } catch (error) {
    console.error(`Error updating post: ${error.message}`)
    if (_.has(error, "response.data")) {
      console.error(JSON.stringify(error.response.data, null, 2))
    }
    return null
  }
}

async function publish(metaData, blogContent, lastModified, skipLastModifiedCheck = false) {
  const parsedContent = await marked.parse(blogContent)
  const {success, post} = await fetchUserPostBySlug(metaData.slug)
  if (success && post) {
    if (!(lastModified && new Date(lastModified) > new Date(post.updatedAt)) && !skipLastModifiedCheck) {
      // No need to update
      console.log("skip the update", post.id)
      return
    }
    const postInput = {
      id: post.id,
      title: metaData.title,
      subtitle: metaData.subtitle,
      contentMarkdown: parsedContent,
      publicationId: publicationId,
      slug: metaData.slug,
      // Add any other fields you want to update
    }

    const updatedPost = await updatePost(postInput)
    if (updatedPost) {
      console.log("Updated Post:", updatedPost)
    }
    return
  }

  const query = `mutation ($input: PublishPostInput!) {
    publishPost(input: $input) {
      post {
        url,
        title,
        slug,
      }
    }
  }`

  const variables = {
    input: {
      title: metaData.title,
      subtitle: metaData.subtitle,
      contentMarkdown: parsedContent,
      publicationId: publicationId,
      slug: metaData.slug,
    },
  }

  try {
    const response = await axios.post(
      apiEndpoint,
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: hashnodeApiKey,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    )

    if (_.get(response, "data.errors")) {
      console.log(`Couldn't publish the article ${metaData.title} to Hashnode`)
      for (const error of response.data.errors) {
        console.error(error)
      }
    } else {
      console.log(`Published to Hashnode: ${metaData.title}`)
    }
  } catch (error) {
    console.error(`Error publishing article ${metaData.title}: ${error.message}`)
    if (_.get(error, "response.data")) {
      console.error(JSON.stringify(error.response.data, null, 2))
    }
  }
}

function toArray(filename) {
  if (Array.isArray(filename)) {
    return filename.map((f) => {
      if (f.endsWith(".md") || f.endsWith(".mdx")) {
        return f
      }
      return `${f}.md`
    })
  }
  filename = filename.endsWith(".md") || filename.endsWith(".mdx") ? filename : `${filename}.md`
  return [filename]
}

async function start() {
  try {
    if (!hashnodeApiKey) {
      console.log("Please set HASH_NODE_API_KEY environment variable")
      process.exit(1)
    }
    if (!publicationId) {
      console.log("Please set HASH_NODE_PUBLICATION_ID environment variable")
      process.exit(1)
    }
    const skipLastModifiedCheck = argv.skipLastModifiedCheck
    const fileName = argv.fileName
    const files = fileName ? toArray(fileName) : fs.readdirSync(blogPostsDir)
    const mdFiles = files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    const promises = []

    for (const file of mdFiles) {
      const filePath = path.join(blogPostsDir, file)
      let {data: metaData, content: blogContent} = matter.read(filePath)
      const lastModified = getLastModified(filePath) || null
      //To publish the post you need to explicitly slug(should be unique) and publish(true)
      if (metaData.publish && metaData.slug) {
        blogContent = blogContent.replace(pathRegex, `${githubBaseUrl}`)
        promises.push(publish(metaData, blogContent, lastModified, skipLastModifiedCheck))
      }
    }
    await Promise.all(promises, {concurrency: 5})
    process.exit(0)
  } catch (err) {
    console.error(`Error reading or publishing the blog post: ${err.message}`)
    process.exit(1)
  }
}

//usage:node hashnode/scripts.js --skipLastModifiedCheck true --fileName '["N+1.md", "playground.md"]'
start()
