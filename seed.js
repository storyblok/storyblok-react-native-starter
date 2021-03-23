const axios = require('axios')
const fs = require('fs')
const netrc = require('netrc')
const os = require('os')
const path = require('path')
const host = 'api.storyblok.com'

const args = process.argv
let space = ''
args.forEach((arg) => {
  if (arg.startsWith('--space')) {
    space = arg.replace('--space=', '')
  }
}) 

let blog_folder = {"story":{"name":"blog","slug":"blog","is_folder":true,"parent_id":"0","default_root":"doc"}}
let first_entry = {"story":{"name":"First Entry","slug":"first-entry","parent_id":"PARENT_ID","content":{
    "intro": "This is my very first post!",
    "title": "First Post",
    "component": "Post",
    "long_text": "I am exited to start this blog!"
}}}


  
let home = process.env[(/^win/.test(process.platform)) ? 'USERPROFILE' : 'HOME']
let credsNetrc = netrc(path.join(home, '.netrc'))
let creds = {}

if (credsNetrc.hasOwnProperty(host)) {
  creds = {
    'email': credsNetrc[host]['login'],
    'token': credsNetrc[host]['password']
  }
  
  startSeed()

} else {
  console.error('Seed: You\'re not logged in. Use the command `storyblok login` to login')
}

async function startSeed() {
  const instance = axios.create({
    baseURL: `https://mapi.storyblok.com/v1/spaces/${space}`,
    headers: {
      'Authorization': creds.token
    }
  })

  // 1. Verison Folder: create the basic folder structure
  let res_1 = await instance.post(`/stories`, blog_folder).catch((error) => console.error(error))
  console.log('Seed: Blog Folder created')

  // 2. Create First Entry to showcase the setup
  first_entry.story.parent_id = res_1.data.story.id
  let res_2 = await instance.post('/stories', first_entry).catch((error) => console.error(error))
  console.log('Seed: First Entry created')

  // 3. Fill Home content entry with base data 
  let res_3 = await instance.get('/stories/', { page: 1 })
  let homeStory = res_3.data.stories.find((story) => {
    return story.slug == 'home';
  });
  homeStory.path = '/'
  homeStory.content = {"component": "page", "body":[{
    "headline": "Storyblok React Native Starterkit",
    "component": "teaser",
    "logo": null,
    "description": "Organize your content for the world"
  }]}

  let res_4 = await instance.put(`/stories/${homeStory.id}`, { story: homeStory }).catch((error) => console.error(error))
  console.log('Seed: Home Content Entry configured')

  // 4. Configure Space with correct preview Domain
  let { data } = await instance.get().catch((error) => console.error(error))
  data.space.domain = 'http://localhost:19006/'

  let final_result = await instance.put('/', data).catch((error) => console.error(error))
  console.log('Seed: Space configured')
  console.log('');
  console.log('Your preview token is: ' + final_result.data.space.first_token);
  console.log('Exchange it in your `utilities/storyblok.js` to continue');
}