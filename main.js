let interval;

let subscribe_button;
let like_button;
let subscribe_text;
let like_text;

window.onload = function()
{
    window.addEventListener('yt-navigate-start', function()
    {
        subscribe_button = null;
        like_button = null;
        subscribe_text = null;
        like_text = null;
        //I have no idea why am I clearing the interval I should probably remove it
        clearInterval(interval);
        interval = setInterval(like, 5000)
    });
    interval = setInterval(like, 5000)
}

function like()
    {
        if (subscribe_button)
        {
            if (!subscribe_text)
            {
                subscribe_text = subscribe_button.textContent;
            }
        }
        else
        {
            subscribe_button = document.getElementById("subscribe-button-shape").getElementsByClassName("yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap")[0];
        }
        if (like_button)
        {
            if (!like_text){like_text = like_button.getElementsByClassName("yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--segmented-start")[0]}
            if (subscribe_text==="Subscribed" && like_text.title !== "Unlike")
            {
                like_button.getElementsByClassName("yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response")[0].click();
            }
        }
        else
        {
            like_button = document.getElementsByTagName("like-button-view-model")[0];
        }
    }
