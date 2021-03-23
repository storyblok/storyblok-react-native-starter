import StoryblokClient from 'storyblok-js-client';

let Storyblok = new StoryblokClient({
  accessToken: 'your-preview-token',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
})


export default Storyblok;