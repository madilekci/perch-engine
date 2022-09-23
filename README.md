# perch-engine
### This is a basic search engine API that uses : node.js | express.js | puppeteer | google search


- This API will take in a search request and return a JSON with the top results from Google's Search Results.
- The information we care about from the results:
* Website Title
* Website Description
* Website URL

The search request will be a GET request and we're going to make use of URL Query Params to specify the search query. The user will send a request to ```/search``` with search query ```searchquery=cats``` like this : 
> ```localhost:3000/search?searchquery=cat```

API will return the top Results about cats from Google in JSON:

```
[
    {
      title: 'Cats Are Cool',
      description: 'This website is all about cats and cats are cool',
      url: 'catsarecool.com'
    },
    ...
    {
      title: 'Cats funny videos',
      description: 'Videos all about cats and they are funny!',
      url: 'catsfunnyvideos.com'
    }
]

```
