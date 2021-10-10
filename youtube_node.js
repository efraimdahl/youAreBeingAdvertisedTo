const Sentiment = require('sentiment');


function colorComments() {

    // Get all 'span' elements on the page
    let comments = document.getElementsByTagName("ytd-comment-renderer");

    for (let i = 0; i < comments.length; ++i) {
        // Check if they contain the text 'Promoted'
        let curcomment = comments[i]
        let text = curcomment.textContent || curcomment.innerText || "";
        
        let sentiment = new Sentiment();
        let result = sentiment.analyze('Cats are stupid.');
        chrome.extension.getBackgroundPage().console.log(text,result);

        let color = "rgb(0,0,0)"
        if(sentiment>0){
            color = "rgb("+(sentiment*(255/7)).toString+",0,0)";
        }else{
            color = "rgb(0,"+Math.abs(sentiment)*(255/7)+",0,0)";
        }
        comments.setAttribute("style","background-color: "+color)
    }
}


colorComments();

// Ensures ads will be removed as the user scrolls
setInterval(function () {
    colorComments();
}, 100)