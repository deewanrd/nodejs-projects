This is a web-scrapping app built on the following technologies:

1. node.js: For handling all the backend part.
2. express.js: For creating web server and listen to incoming API requests.
2. puppeteer: For implementing the main logic i.e. crawling the webpage.
3. angular: For frontend related work.

Requirements for running the project:

1. node (version: 7.6.0 or greater for supporting async/await)
2. Internet connection (For crawling a given web page)

Steps to follow for running the project:

1. Move to the location of the project.
2. run npm install -> This is required to install all the dependencies that are required for the project.
3. run node app.js -> This starts the server and listens to incoming requests.

Through UI --->

4. Open Chrome browser and hit: http://localhost:8000/. A web page will be displayed.
5. Select any url out of the given to view the reviews provided on that particular web page.


Through API --->

4. Open Postman.
5. Create a basic GET request with the following endpoint and the parameters:

http://localhost:8000/fetchReviews?reviewPageUrl="http://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=3415697"

The parameter is reviewPageUrl whose value is a url for which we want to crawl the reviews.
