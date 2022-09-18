const axios = require('axios');
const cheerio = require('cheerio');

const instagram_post_url = "https://www.instagram.com/p/CbASZ-Ot5jE/";
const targetServer = "https://www.w3toys.com/";
const post_data = "link="+ encodeURIComponent(instagram_post_url) +"&submit=DOWNLOAD";

axios.post(targetServer, post_data).then(response => {
	const $ = cheerio.load(response.data);
	$('.dlsection').each((index, element) => {
		
		const download_link = [];
		$(element).find('a').each((index, element) => {
			download_link.push(element['attribs']['href']);
		})

		if(download_link.length > 0){
			console.log({
				"status": true,
				"message": "Processed successfully",
				"ig_link": instagram_post_url,
				"count": download_link.length,
				"download_links": download_link
			});
		}else{
			console.log({
				"status": false,
				"message": "invalid url, check & try again",
				"ig_link": instagram_post_url
			});
		}
		
	})
}).catch(function(e){
    console.log("Error Occurred While Sending Main Server Postback");
    console.log({
		"status": false,
		"message": "Unable to makerequest. " + e,
		"ig_link": instagram_post_url
	});
}).then(function(){
    /*Nothing to Do*/
})
//where is bot?