import StoryblokClient from 'storyblok-js-client';

let Storyblok = new StoryblokClient({
  accessToken: '02Qbq8v7brt4VGzcK7BYCAtt',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
})


export default Storyblok;