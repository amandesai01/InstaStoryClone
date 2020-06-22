# InstaStoryClone

### Create a simple mini instagram clone using REST APIs.

Build the following simple APIs
* Created a story with two images and a caption: Used cloudinary to upload the images and stored the data in a mongodb database.
* Get the created stories with pagination. 


USAGE:

#### CREATE STORY:
```
POST https://localhost:3000/story
FORM DATA:
image: <imagefile1>
image: <imagefile2>
caption: <caption>
```

#### GET STORY
```
GET https://localhost:3000/story?limit=<LIMIT>&page=<PAGE>
```
