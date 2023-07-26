import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getFiles } from './mdx'
import kebabCase from './utils/kebabCase'

const root = process.cwd()

export async function getAllWikis(type) {
  const files = await getFiles(type)
  console.log(files)

  //remove the .mdx extension from the file name
  return files.map((file) => {
    return {
      params: {
        wiki: file.replace(/\.mdx/, ''),
      },
    };
  })
}
